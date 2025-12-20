"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar, Trash2, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  status: "new" | "read" | "responded";
  adminNotes?: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const res = await fetch("/api/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts.sort((a: Contact, b: Contact) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      }
    } catch (error) {
      console.error("Failed to load contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Contact["status"]) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        loadContacts();
      }
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadContacts();
        setSelectedContact(null);
      }
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  if (loading) {
    return <div className="text-heading">Loading contacts...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-heading mb-2">Contact Requests</h1>
        <p className="text-body-copy">{contacts.length} total submissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-2 space-y-4">
          {contacts.length === 0 ? (
            <div className="bg-surface border border-border rounded-lg p-8 text-center">
              <Mail className="w-12 h-12 text-body-copy/30 mx-auto mb-4" />
              <p className="text-body-copy">No contact submissions yet</p>
            </div>
          ) : (
            contacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-surface border rounded-lg p-6 cursor-pointer transition-all ${
                  selectedContact?.id === contact.id
                    ? "border-highlight ring-2 ring-highlight/20"
                    : "border-border hover:border-highlight/50"
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-heading text-lg">{contact.name}</h3>
                    <p className="text-sm text-body-copy">{contact.email}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contact.status === "new"
                        ? "bg-blue-500/20 text-blue-400"
                        : contact.status === "read"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-body-copy mb-3">
                  <span className="flex items-center gap-1">
                    <Mail size={14} />
                    {contact.inquiryType}
                  </span>
                  {contact.phone && (
                    <span className="flex items-center gap-1">
                      <Phone size={14} />
                      {contact.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-body-copy text-sm line-clamp-2">{contact.message}</p>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact Detail */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            {selectedContact ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <h2 className="font-serif text-2xl font-bold text-heading mb-4">Details</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm text-body-copy">Name</label>
                    <p className="text-heading font-medium">{selectedContact.name}</p>
                  </div>

                  <div>
                    <label className="text-sm text-body-copy">Email</label>
                    <p className="text-heading font-medium">{selectedContact.email}</p>
                  </div>

                  {selectedContact.phone && (
                    <div>
                      <label className="text-sm text-body-copy">Phone</label>
                      <p className="text-heading font-medium">{selectedContact.phone}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm text-body-copy">Inquiry Type</label>
                    <p className="text-heading font-medium">{selectedContact.inquiryType}</p>
                  </div>

                  <div>
                    <label className="text-sm text-body-copy">Message</label>
                    <p className="text-heading">{selectedContact.message}</p>
                  </div>

                  <div>
                    <label className="text-sm text-body-copy">Received</label>
                    <p className="text-heading font-medium">
                      {new Date(selectedContact.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-body-copy">Actions</label>
                  
                  {selectedContact.status === "new" && (
                    <Button
                      onClick={() => updateStatus(selectedContact.id, "read")}
                      className="w-full bg-highlight text-page-bg hover:bg-highlight-dark"
                    >
                      <Eye className="mr-2" size={16} />
                      Mark as Read
                    </Button>
                  )}

                  {selectedContact.status === "read" && (
                    <Button
                      onClick={() => updateStatus(selectedContact.id, "responded")}
                      className="w-full bg-highlight text-page-bg hover:bg-highlight-dark"
                    >
                      <Check className="mr-2" size={16} />
                      Mark as Responded
                    </Button>
                  )}

                  <Button
                    onClick={() => deleteContact(selectedContact.id)}
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
                  >
                    <Trash2 className="mr-2" size={16} />
                    Delete
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-surface border border-border rounded-lg p-8 text-center">
                <Mail className="w-12 h-12 text-body-copy/30 mx-auto mb-4" />
                <p className="text-body-copy">Select a contact to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

