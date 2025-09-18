#!/bin/bash

echo "🚀 מתחיל התקנה של מערכת ניהול שירים..."

# בדיקת Docker
if ! docker --version > /dev/null 2>&1; then
    echo "❌ Docker לא מותקן. אנא התקן Docker Desktop קודם."
    exit 1
fi

# בדיקת Node.js
if ! node --version > /dev/null 2>&1; then
    echo "❌ Node.js לא מותקן. אנא התקן Node.js 18+ קודם."
    exit 1
fi

# יצירת קובץ סביבה
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ נוצר קובץ .env"
fi

# יצירת תיקיות נדרשות
mkdir -p backend/uploads
mkdir -p uploads

# התקנת dependencies
echo "📦 מתקין dependencies..."
npm install

echo "📦 מתקין backend dependencies..."
cd backend && npm install && cd ..

echo "📦 מתקין frontend dependencies..."
cd frontend && npm install && cd ..

# הרצת Docker
echo "🐳 מרים Docker containers..."
docker-compose up -d

echo ""
echo "🎉 ההתקנה הושלמה בהצלחה!"
echo "📱 Frontend: http://localhost:3001"
echo "🔧 Backend: http://localhost:3000"
echo "🗄️ Database: localhost:5432"
echo ""
echo "פקודות שימושיות:"
echo "  npm run dev          # הרצת פיתוח"
echo "  docker-compose logs  # צפייה בלוגים"
echo "  docker-compose down  # עצירת השירותים"
