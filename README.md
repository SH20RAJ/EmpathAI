# EmpathAI - AI-Powered Mood Tracking and Mental Health Support

EmpathAI is an innovative web application that combines mood tracking with AI-powered conversations to provide personalized mental health support. Built with Next.js and enhanced with modern UI components, it offers a seamless and engaging user experience.

## 🌟 Features

- **Mood Tracking**: Log and visualize your daily mood patterns with an interactive chart
- **AI Chat Support**: Have meaningful conversations with an AI that understands and responds to your emotional state
- **Resource Library**: Access curated mental health resources and articles
- **Progress Insights**: Get personalized insights about your mood patterns and emotional well-being
- **Secure & Private**: Your data is encrypted and stored securely

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL Database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/empathai.git
cd empathai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
OPENAI_API_KEY=your_openai_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Run database migrations:
```bash
node src/db/migrate.js
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **UI Components**: shadcn/ui
- **Database**: MySQL with Drizzle ORM
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **AI Integration**: OpenAI API

## 📱 Features in Detail

### Mood Tracking
- Daily mood logging with notes
- Interactive mood history visualization
- Weekly and monthly mood summaries
- Pattern recognition and insights

### AI Chat Support
- Context-aware conversations
- Emotional support and guidance
- Progress tracking
- Customizable chat interface

### Resource Center
- Curated mental health articles
- Guided meditation resources
- Self-help tools and exercises
- Community support links

## 🔒 Security

- All sensitive data is encrypted
- GDPR compliant
- Regular security audits
- Secure authentication with NextAuth.js

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for their powerful API
- The mental health professional community for guidance
- Our amazing contributors and supporters

## 📞 Support

For support, email support@empathai.com or join our [Discord community](https://discord.gg/empathai).
