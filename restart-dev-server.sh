#!/bin/bash

echo "=================================="
echo "Restarting Next.js Dev Server"
echo "=================================="
echo ""

# Step 1: Kill any running Next.js processes
echo "🔄 Stopping any running Next.js processes..."
pkill -f "next dev" 2>/dev/null
sleep 1

# Step 2: Remove .next cache
echo "🗑️  Clearing Next.js cache..."
rm -rf .next

# Step 3: Verify environment variables
echo ""
echo "✅ Checking environment variables..."
if grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
    echo "   ✓ SUPABASE_SERVICE_ROLE_KEY found in .env.local"
else
    echo "   ✗ ERROR: SUPABASE_SERVICE_ROLE_KEY not found in .env.local!"
    exit 1
fi

echo ""
echo "=================================="
echo "Ready to start the server!"
echo "=================================="
echo ""
echo "Now run:"
echo "  npm run dev"
echo ""



