// src/App.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaMedium, FaBars, FaTimes,
  FaArrowRight, FaDownload, FaRobot, FaEye, FaPalette,
  FaBrain, FaPaperPlane, FaGraduationCap, FaEnvelope,
  FaMapMarkerAlt, FaPhone, FaExternalLinkAlt, FaLaptopCode,
  FaCheck, FaSun, FaMoon, FaCode, FaChartLine, FaDatabase,
  FaCloud, FaCog, FaRocket, FaLightbulb, FaAward
} from 'react-icons/fa';

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Neural network background nodes
  const [neuralNodes, setNeuralNodes] = useState([]);

  // Typewriter effect
  const TypewriterText = ({ texts, className = "" }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      const text = texts[currentTextIndex];
      const timeout = setTimeout(() => {
        if (!isDeleting) {
          setCurrentText(text.substring(0, currentText.length + 1));
          if (currentText === text) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(text.substring(0, currentText.length - 1));
          if (currentText === '') {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      }, isDeleting ? 50 : 100);

      return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentTextIndex, texts]);

    return (
      <span className={className}>
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    );
  };

  // Terminal Demo Component
  const TerminalDemo = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const commands = [
      "$ pip install torch transformers",
      "$ python train_model.py --epochs 100",
      "Training... Epoch 1/100 - Loss: 0.045",
      "Model saved successfully! ✅"
    ];

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentLine(prev => (prev + 1) % commands.length);
      }, 2000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm">
        <div className="flex items-center mb-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-4 text-slate-400">neural_network.py</span>
        </div>
        {commands.slice(0, currentLine + 1).map((cmd, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-green-400 mb-1"
          >
            {cmd}
          </motion.div>
        ))}
        <div className="w-2 h-4 bg-green-400 animate-pulse inline-block"></div>
      </div>
    );
  };

  // Enhanced Project Card Component
  const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleLiveDemo = () => {
      if (project.demo || project.link) {
        window.open(project.demo || project.link, '_blank', 'noopener,noreferrer');
      }
    };

    const handleGithub = () => {
      if (project.github) {
        window.open(project.github, '_blank', 'noopener,noreferrer');
      }
    };

    return (
      <motion.div
        className="group relative bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-3xl overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -15, scale: 1.02 }}
        onClick={handleLiveDemo} // Make entire card clickable
      >
        {/* Interactive Demo Area */}
        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

          {/* Floating particles effect */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-30"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-6xl opacity-20"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 2 }}
            >
              {project.icon}
            </motion.div>
          </div>

          {/* Hover overlay with "View Project" */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 text-white font-semibold">
                  View Project
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h3>
            <div className="flex gap-2">
              <motion.button
                className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/20 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  handleLiveDemo();
                }}
                disabled={!project.demo && !project.link}
                title="View Live Demo"
              >
                <FaExternalLinkAlt size={14} />
              </motion.button>
              <motion.button
                className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/20 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  handleGithub();
                }}
                disabled={!project.github}
                title="View Source Code"
              >
                <FaGithub size={14} />
              </motion.button>
            </div>
          </div>

          <p className="text-slate-400 mb-4">{project.description}</p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 text-indigo-300 border border-indigo-500/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Performance metrics */}
          {project.metrics && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
              {project.metrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-indigo-400">{metric.value}</div>
                  <div className="text-xs text-slate-500">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Project status indicator */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center text-xs">
              <div className={`w-2 h-2 rounded-full mr-2 ${project.demo || project.link ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
              <span className="text-slate-400">
                {project.demo || project.link ? 'Live' : 'In Development'}
              </span>
            </div>
            {(project.demo || project.link) && (
              <span className="text-xs text-emerald-400 font-medium">
                Click to view →
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };


  // Enhanced Contact Form
  const ContactForm = () => {
    const validateForm = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.message.trim()) newErrors.message = 'Message is required';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setSubmitted(true);
    };

    if (submitted) {
      return (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="text-white text-2xl" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
          <p className="text-slate-300">Thanks for reaching out. I'll get back to you soon!</p>
        </motion.div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-slate-300 mb-2">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full bg-slate-800/50 backdrop-blur-md border rounded-xl py-3 px-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 transition ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-indigo-500'
              }`}
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-slate-300 mb-2">Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full bg-slate-800/50 backdrop-blur-md border rounded-xl py-3 px-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 transition ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-indigo-500'
              }`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-slate-300 mb-2">Subject</label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl py-3 px-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="How can I help?"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-2">Message *</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`w-full bg-slate-800/50 backdrop-blur-md border rounded-xl py-3 px-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 transition h-32 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-indigo-500'
              }`}
            placeholder="Your message..."
          />
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl flex items-center justify-center transition-all duration-300 hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
              Sending...
            </>
          ) : (
            <>
              Send Message <FaPaperPlane className="ml-3" />
            </>
          )}
        </motion.button>
      </form>
    );
  };

  // Project data with enhanced information
  const projects = [
    {
      id: 1,
      title: 'DewAstraAI',
      link: 'https://dew-astra.vercel.app/',
      description: 'AI-powered sales automation platform with voice agents that handle lead qualification, follow-ups, and customer care. Built emotionally intelligent, human-sounding AI personas to scale outreach and boost conversion rates. Led product development, go-to-market strategy, and team operations.',
      tags: ['nlp', 'Agentic framework'],
      github: 'https://github.com/yourusername/dew-astra', // Add your actual GitHub link
      demo: 'https://dew-astra.vercel.app/',
      icon: <FaRobot className="text-indigo-400 text-2xl" />,
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      id: 2,
      title: 'Jewelry website',
      description: 'Designed and developed a responsive website for a jewelry brand, showcasing product collections with modern design and responsive layout.',
      tags: ['React', 'js'],
      github: 'https://github.com/yourusername/jewelry-website', // Add placeholder or real link
      demo: 'https://jewl-alpha.vercel.app/',
      link: 'https://jewl-alpha.vercel.app/',
      icon: <FaEye className="text-emerald-400 text-2xl" />,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      id: 3,
      title: 'Creative AI Artist',
      description: 'Generate consistent character artworks using GANs and CLIP, enabling artists to create unique styles and characters.',
      tags: ['genai', 'gans'],
      github: 'https://github.com/yourusername/creative-ai-artist', // Add placeholder
      demo: 'https://your-demo-link.vercel.app/', // Add placeholder
      link: 'https://your-demo-link.vercel.app/', // Add placeholder
      icon: <FaPalette className="text-purple-400 text-2xl" />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 4,
      title: 'BrandBrandAI',
      description: 'AI-powered platform that generates personalized brand strategies, including logos, color schemes, and marketing content, tailored to client needs.',
      tags: ['nlp', 'genai'],
      github: 'https://github.com/yourusername/brandbrand-ai', // Add placeholder
      demo: 'https://huggingface.co/spaces/kapildew18/BrandBrainAI', // Add placeholder
      link: 'https://huggingface.co/spaces/kapildew18/BrandBrainAI', // Add placeholder
      icon: <FaBrain className="text-amber-400 text-2xl" />,
      color: 'from-amber-500 to-amber-600',
      // metrics: [
      //   { value: '23%', label: 'ROI' },
      //   { value: '0.15', label: 'Sharpe Ratio' }
      // ]
    },
    {
      id: 5,
      title: 'LinkedIn post generator',
      description: 'AI-powered tool that generates engaging LinkedIn posts based on user input and trending topics, helping professionals boost their online presence.',
      tags: ['nlp', 'dev-tools'],
      github: 'https://github.com/yourusername/linkedin-post-generator', // Add placeholder
      demo: 'https://huggingface.co/spaces/kapildew18/LinkdinPostGeneratorAI', // Add placeholder
      link: 'https://huggingface.co/spaces/kapildew18/LinkdinPostGeneratorAI', // Add placeholder
      icon: <FaCode className="text-green-400 text-2xl" />,
      color: 'from-green-500 to-green-600',
    },
  ];


  // Navigation items
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' }
  ];

  // Filters
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'nlp', label: 'NLP' },
    { id: 'vision', label: 'Computer Vision' },
    { id: 'genai', label: 'Generative AI' },
    { id: 'rl', label: 'Reinforcement Learning' },

    { id: 'dev-tools', label: 'Dev Tools' }
  ];

  // Initialize neural nodes and scroll listener
  useEffect(() => {
    const nodes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2
    }));
    setNeuralNodes(nodes);

    // Scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Section observer
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Defer state update on next frame to avoid layout thrash during first paint
          requestAnimationFrame(() => setActiveSection(entry.target.id));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = ['hero', 'about', 'projects', 'resume', 'contact'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Keyboard navigation
    const handleKeyPress = (e) => {
      if (e.altKey) {
        switch (e.key) {
          case '1': document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); break;
          case '2': document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); break;
          case '3': document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); break;
          case '4': document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
      observer.disconnect();
    };
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  // Filter projects
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 overflow-x-hidden">
      {/* Neural Network Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.2)_0%,rgba(2,6,23,0.8)_100%)]"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {neuralNodes.map(node => (
          <div
            key={node.id}
            className="absolute rounded-full bg-emerald-400 animate-[pulseGlow_3s_ease-in-out_infinite]"
            style={{
              top: `${node.y}%`,
              left: `${node.x}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)'
            }}
          />
        ))}

        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          {neuralNodes.slice(0, 6).map((node, i) => {
            const target = neuralNodes[(i + 5) % neuralNodes.length];
            return (
              <path
                key={`path-${i}`}
                d={`M ${node.x}% ${node.y}% L ${target.x}% ${target.y}%`}
                stroke="rgba(16, 185, 129, 0.08)"
                strokeWidth="0.5"
                fill="none"
              />
            );
          })}
        </svg>
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-4 inset-x-0 z-50 will-change-transform"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div
          className={`mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3 rounded-2xl transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-lg border border-slate-800' : 'bg-transparent'}`}
        >
          <div className="flex items-center">
            <img
              src="/imgkap.jpg" // Replace with your image path
              alt="Your Name"
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
            />
            <span className="ml-3 font-bold text-xl hidden md:block">Kapil Dewangan</span>
          </div>

          <div className="hidden md:flex space-x-6">
            {navItems.map(item => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-1 py-2 ${activeSection === item.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                onClick={() => setActiveSection(item.id)}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500"
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-300 hover:text-yellow-400 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </motion.button>

            <motion.a
              href="https://github.com"
              target="_blank"
              whileHover={{ y: -3, color: '#c084fc' }}
              className="text-slate-300"
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kapil-dewangan-19188b235/"
              target="_blank"
              whileHover={{ y: -3, color: '#0ea5e9' }}
              className="text-slate-300"
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.a
              href="https://medium.com"
              target="_blank"
              whileHover={{ y: -3, color: '#ec4899' }}
              className="text-slate-300"
            >
              <FaMedium size={20} />
            </motion.a>
          </div>

          <button
            className="md:hidden text-slate-300 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center space-y-8">
              {navItems.map(item => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-2xl ${activeSection === item.id ? 'text-white font-bold' : 'text-slate-400'}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * navItems.indexOf(item) }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="flex space-x-6 mt-12">
              <motion.a
                href="https://github.com"
                target="_blank"
                whileHover={{ y: -3, color: '#c084fc' }}
                className="text-slate-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FaGithub size={28} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                whileHover={{ y: -3, color: '#0ea5e9' }}
                className="text-slate-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <FaLinkedin size={28} />
              </motion.a>
              <motion.a
                href="https://medium.com"
                target="_blank"
                whileHover={{ y: -3, color: '#ec4899' }}
                className="text-slate-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <FaMedium size={28} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center relative pt-20 pb-20">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-12 md:mb-0 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Hi, I'm <span className="text-indigo-400">Kapil Dewangan</span><br />
                <TypewriterText
                  texts={["AI Engineer", "Developer", "Genrative AI Expert", "Innovation Builder"]}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400"
                />
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg">
                Building intelligent systems that solve complex problems through machine learning,
                deep learning, and innovative AI solutions that make a real-world impact.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl flex items-center transition-all duration-300 hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-indigo-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See My Work <FaArrowRight className="ml-3" />
              </motion.button>

              <motion.button
                className="bg-slate-800/50 backdrop-blur-lg hover:bg-slate-700/50 font-semibold py-3 px-8 rounded-xl flex items-center transition-all duration-300 border border-slate-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resumekdd.pdf';
                  link.download = 'resumekdd.pdf';
                  link.click();
                }}
              >
                <FaDownload className="mr-3" /> Download CV
              </motion.button>

            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className="bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-3xl p-6 max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <TerminalDemo />
              </motion.div>

              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 blur-xl opacity-30"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 blur-xl opacity-30"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <a
            href="#about"
            className="text-slate-300 hover:text-white"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </a>
        </motion.div>
      </section >

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Learn about my journey, skills, and experience in artificial intelligence and machine learning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-3xl p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center mb-8">
                {/* Profile Picture Placeholder - Replace src with your image */}
                <img
                  src="/imgkap.jpg" // Replace this with your actual image path
                  alt="Kapil Dewangan"
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback avatar */}
                <div className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-4xl font-bold text-white hidden">
                  KD
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-indigo-300">Professional Journey</h3>
              <p className="text-slate-300 mb-6">
                I'm an AI Engineer specializing in designing and implementing machine learning systems.
                My expertise spans natural language processing, computer vision, and deploying scalable AI solutions.
              </p>
              <p className="text-slate-300">
                I'm passionate about creating AI systems that have a meaningful impact. My approach combines cutting-edge research
                with practical engineering to build solutions that solve real-world problems.
              </p>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-emerald-300 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                  Technical Skills
                </h4>

                <div className="space-y-5">
                  {[
                    { label: 'Deep Learning ', value: 95 },
                    { label: 'Natural Language Processing', value: 90 },
                    { label: 'Computer Vision', value: 69 },
                    { label: 'Deployment', value: 88 },
                    { label: 'Generative AI & LLMs', value: 95 }
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span>{skill.label}</span>
                        <span>{skill.value}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div>
              <motion.h3
                className="text-xl font-bold mb-6 text-indigo-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Experience Timeline
              </motion.h3>

              <div className="space-y-4">
                {[
                  {
                    period: '2025 - Present',
                    title: 'Founder – DevAstra AI',
                    description: 'Launched an AI-powered sales automation platform with voice agents that handle lead qualification, follow-ups, and customer care. Built emotionally intelligent, human-sounding AI personas to scale outreach and boost conversion rates. Led product development, go-to-market strategy, and team operations.',
                    icon: <FaRocket />
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-8 border-l-2 border-slate-700 py-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <div className="absolute left-[-12px] top-2 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs">
                      {item.icon}
                    </div>
                    <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                      <div className="text-sm text-emerald-400 font-semibold">{item.period}</div>
                      <h4 className="text-lg font-bold mt-1">{item.title}</h4>
                      <p className="text-slate-300 mt-2">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-10 bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="text-lg font-bold mb-4 text-emerald-300 flex items-center">
                  <FaGraduationCap className="mr-2" />
                  Education
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-indigo-500 to-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <FaGraduationCap className="text-white" />
                    </div>
                    <div>
                      <h5 className="font-bold">B.Tech in Computer Science engineering </h5>
                      <p className="text-slate-300">Kalinga Institute of Industrial Technology, 2021-2023</p>
                      <p className="text-slate-400 text-sm"></p>
                    </div>
                    <div>
                      <h5 className="font-bold">B.Tech in Computer Science engineering specialized in Artificial Intelligence and Machine Learning</h5>
                      <p className="text-slate-300">KK Modi University, 2023-2025</p>
                      <p className="text-slate-400 text-sm">Thesis: "AI powered voice sales data assistant"</p>
                    </div>
                  </div>
                  <div className="flex items-start">

                  </div>
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                className="mt-6 bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h4 className="text-lg font-bold mb-4 text-emerald-300 flex items-center">
                  <FaAward className="mr-2" />
                  Certifications
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Nanodegree Program in Generative AI by Udacitybyaccenture (Bertelsmann Tech Scholarship! holder)',
                    'Python for Data Science by IBM',
                    'Google Cloud genrative AI',
                    'Harvard ethics at work',
                  ].map((cert, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                      <span className="text-sm text-slate-300">{cert}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section >

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Projects</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Explore my portfolio of AI projects spanning natural language processing, computer vision,
              generative models.
            </p>
          </motion.div>

          {/* Project Filters */}
          <div className="flex justify-center flex-wrap mb-10 gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter.id
                  ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                  }`}
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Avoid whileInView for first paint to prevent missing items before observer settles */}
            <AnimatePresence mode="sync">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className="px-6 py-3 rounded-xl bg-slate-800/50 backdrop-blur-lg border border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:text-white font-medium transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects on GitHub
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Resume</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Download my comprehensive resume to learn more about my qualifications and experience.
            </p>
          </motion.div>

          <motion.div
            className="bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-b from-indigo-600 to-indigo-800 p-8">
                <div className="text-center mb-8">
                  {/* Profile Picture in Resume - Replace src with your image */}
                  <img
                    src="/imgkap.jpg" // Replace this with your actual image path
                    alt="Kapil Dewangan"
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback avatar for resume */}


                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-white">Contact</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-indigo-100">
                        <FaEnvelope className="mr-3" /> kapildew18@gmail.com
                      </li>
                      <li className="flex items-center text-indigo-100">
                        <FaPhone className="mr-3" /> +91 9993222800
                      </li>
                      <li className="flex items-center text-indigo-100">
                        <FaMapMarkerAlt className="mr-3" /> Bhilai, Chhattisgarh, India
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-white">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Python', 'Flux', 'React', 'Canva', 'NLP', 'Deep Learning',
                        'GEN AI', 'Agentic AI', 'vercel', 'API', 'LLMs'
                      ].map(skill => (
                        <span key={skill} className="bg-indigo-500/30 text-indigo-100 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-8">
                <h4 className="text-xl font-bold mb-6 text-indigo-500">Professional Experience</h4>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-bold text-lg">Founder</h5>
                    <div className="text-indigo-400 mb-2">DewAstra AI • 2025 - Present</div>
                    <ul className="text-slate-300 list-disc list-inside space-y-1">
                      <li>Launched an AI-powered sales automation platform with voice agents that handle lead qualification, follow-ups, and customer care. Built emotionally intelligent, human-sounding AI personas to scale outreach and boost conversion rates. Led product development, go-to-market strategy, and team operations.</li>

                    </ul>
                  </div>




                </div>

                <h4 className="text-xl font-bold mb-6 mt-10 text-indigo-500">Key Achievements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <div className="text-2xl font-bold text-emerald-400">2 Times</div>
                    <div className="text-sm text-slate-300">Best Photography Award at IIIT Raipur</div>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <div className="text-2xl font-bold text-indigo-400">5M+</div>
                    <div className="text-sm text-slate-300">Daily API Requests</div>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-400">🧠</div>
                    <div className="text-sm text-slate-300">AI Researcher</div>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <div className="text-2xl font-bold text-amber-400">40%</div>
                    <div className="text-sm text-slate-300">Processing Time Reduction</div>
                  </div>
                </div>

                <div className="mt-10 text-center">
                  <motion.button
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl flex items-center mx-auto transition-all duration-300 hover:from-indigo-600 hover:to-indigo-700 shadow-lg hover:shadow-indigo-500/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaDownload className="mr-3" /> Download Full Resume
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Have a project in mind or want to discuss AI opportunities? Feel free to reach out!
            </p>
          </motion.div>

          <motion.div
            className="bg-slate-800/30 backdrop-blur-lg border border-slate-700 rounded-3xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's talk about AI</h3>
                <p className="text-slate-300 mb-8">
                  I'm currently available for consulting, speaking engagements, and select freelance opportunities.
                  Whether you have a question or just want to connect, feel free to send me a message.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-indigo-500 to-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">Email</h4>
                      <p className="text-slate-300">kapildew18@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-indigo-500 to-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">Location</h4>
                      <p className="text-slate-300">Bhilai, Chhattisgarh</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-indigo-500 to-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center">
                      <FaLinkedin className="text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">LinkedIn</h4>
                      <p className="text-slate-300">https://www.linkedin.com/in/kapil-dewangan-19188b235/</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-10">
                  <motion.a
                    href="#"
                    className="w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-300 hover:text-indigo-400 hover:bg-indigo-500/20 transition"
                    whileHover={{ y: -5 }}
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:bg-blue-500/20 transition"
                    whileHover={{ y: -5 }}
                  >
                    <FaLinkedin />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/kapil-dewangan-19188b235/"
                    className="w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-500/20 transition"
                    whileHover={{ y: -5 }}
                  >
                    <FaMedium />
                  </motion.a>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/imgkap.jpg" // Replace with your actual image path
              alt="Your Name"
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
            />
          </motion.div>

          <p className="text-slate-400">© {new Date().getFullYear()} Kapil Dewangan. All rights reserved.</p>
          <p className="text-slate-500 mt-2">Designed and built with ❤️ By Kapil Dewangan</p>

          <div className="flex justify-center mt-6 space-x-4">
            <a href="#" className="text-slate-500 hover:text-slate-300 transition">Privacy Policy</a>
            <span className="text-slate-500">•</span>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
