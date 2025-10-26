# 🚀 Harsh's Portfolio

A modern, responsive portfolio website built with React, Vite, and TailwindCSS, featuring interactive 3D elements, dark/light theme support, and seamless animations.

🌐 **Live Demo:** [meharsh.vercel.app](https://meharsh.vercel.app)



## ✨ Key Features

- 🎮 **Interactive 3D Elements** — Custom-built 3D models and animations using Three.js
- 🌓 **Dark/Light Theme** — System-aware theme with manual toggle option
- 📱 **Fully Responsive** — Seamless experience across all devices
- ⚡ **Modern Stack** — Built with React, Vite, and TailwindCSS
- 🎯 **Smooth Animations** — Engaging animations using Framer Motion
- 📬 **Smart Contact Form** — Interactive form with EmailJS integration
- 🎨 **Modern UI** — Sleek components built with shadcn/ui
- 🚀 **Performance Optimized** — Lazy loading and code splitting

## 🛠️ Tech Stack

- **Core:** React 18, Vite, TailwindCSS
- **3D Graphics:** Three.js / React Three Fiber
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui
- **Form Handling:** EmailJS
- **Icons:** Lucide Icons
- **State Management:** React Hooks
- **Development:** TypeScript
- **Deployment:** Vercel
- **Version Control:** Git

## 📚 Project Structure

```
harshportfolio/
├── src/
│   ├── components/
│   │   ├── sections/       # Main page sections
│   │   │   ├── Hero.jsx   # 3D hero section
│   │   │   ├── About.jsx  # About section
│   │   │   └── ...
│   │   ├── layout/        # Layout components
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── pages/             # Page components
├── public/                # Static assets
└── ...config files
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation Steps

1. **Clone the repository:**
```bash
git clone https://github.com/Harsh-7243/harshportfolio.git
cd harshportfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4. **Start development server:**
```bash
npm run dev
```

5. **Build for production:**
```bash
npm run build
```

## 🎨 Customization

### Theme Configuration

Customize the theme in `src/index.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 220 80% 10%;
  /* More variables... */
}

.dark {
  --background: 195 22% 6%;
  --foreground: 205 18% 95%;
  /* Dark mode variables... */
}
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔄 State Management

- Theme state managed with localStorage
- Form states handled with React hooks
- Animations controlled by Framer Motion
- 3D models managed by React Three Fiber

## 📱 Responsive Design

- Mobile-first approach
- Adaptive 3D elements
- Responsive typography
- Touch-friendly interactions

## 🎯 Future Roadmap

- [ ] Add blog/articles section
- [ ] Implement i18n for multiple languages
- [ ] Add more interactive 3D elements
- [ ] Integrate a CMS for content management
- [x] Implement dark/light theme
- [x] Add contact form functionality

## 👨‍💻 Let's Connect!

Feel free to reach out and connect:

| Platform | Link |
|----------|------|
| 🌐 Portfolio | [meharsh.vercel.app](https://meharsh.vercel.app) |
| 💼 LinkedIn | [@harsh-kumar](https://linkedin.com/in/harsh-kumar-9a10152b7) |
| 🐙 GitHub | [@Harsh-7243](https://github.com/Harsh-7243) |
| 📧 Email | srivastavaharsh1108@gmail.com |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### 🙏 Acknowledgments

- shadcn/ui for the beautiful components
- Three.js community for 3D resources
- Framer Motion for smooth animations
- And all open-source contributors!
