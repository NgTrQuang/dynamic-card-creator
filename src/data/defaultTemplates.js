import { v4 as uuidv4 } from 'uuid';

export const defaultTemplates = [
  {
    id: 'template-1',
    name: 'Professional Blue',
    thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=200&h=120&fit=crop',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    cardSize: { width: 400, height: 250 },
    elements: [
      {
        id: uuidv4(),
        type: 'image',
        x: 20,
        y: 20,
        width: 80,
        height: 80,
        scale: 1,
        content: 'https://randomuser.me/api/portraits/men/32.jpg',
        borderRadius: '50%'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 120,
        y: 30,
        width: 250,
        height: 30,
        scale: 1,
        content: 'John Doe',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 120,
        y: 65,
        width: 250,
        height: 20,
        scale: 1,
        content: 'Senior Developer',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#e0e0e0'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 20,
        y: 130,
        width: 360,
        height: 20,
        scale: 1,
        content: '📧 john.doe@example.com',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffff'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 20,
        y: 160,
        width: 360,
        height: 20,
        scale: 1,
        content: '📱 +1 234 567 890',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffff'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 20,
        y: 190,
        width: 360,
        height: 20,
        scale: 1,
        content: '🌐 www.johndoe.com',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffff'
      }
    ]
  },
  {
    id: 'template-2',
    name: 'Minimalist White',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=120&fit=crop',
    background: {
      type: 'color',
      value: '#ffffff'
    },
    cardSize: { width: 400, height: 250 },
    elements: [
      {
        id: uuidv4(),
        type: 'image',
        x: 160,
        y: 20,
        width: 80,
        height: 80,
        scale: 1,
        content: 'https://randomuser.me/api/portraits/women/44.jpg',
        borderRadius: '50%'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 50,
        y: 115,
        width: 300,
        height: 30,
        scale: 1,
        content: 'Jane Smith',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a1a1a',
        textAlign: 'center'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 50,
        y: 145,
        width: 300,
        height: 20,
        scale: 1,
        content: 'UX Designer',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666666',
        textAlign: 'center'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 50,
        y: 180,
        width: 300,
        height: 20,
        scale: 1,
        content: 'jane@design.co | +1 555 123 456',
        fontSize: 12,
        fontWeight: 'normal',
        color: '#888888',
        textAlign: 'center'
      },
      {
        id: uuidv4(),
        type: 'decoration',
        x: 50,
        y: 210,
        width: 300,
        height: 3,
        scale: 1,
        backgroundColor: '#667eea'
      }
    ]
  },
  {
    id: 'template-3',
    name: 'Dark Elegant',
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=200&h=120&fit=crop',
    background: {
      type: 'gradient',
      value: 'linear-gradient(180deg, #232526 0%, #414345 100%)'
    },
    cardSize: { width: 400, height: 250 },
    elements: [
      {
        id: uuidv4(),
        type: 'decoration',
        x: 0,
        y: 0,
        width: 6,
        height: 250,
        scale: 1,
        backgroundColor: '#f59e0b'
      },
      {
        id: uuidv4(),
        type: 'image',
        x: 300,
        y: 20,
        width: 80,
        height: 80,
        scale: 1,
        content: 'https://randomuser.me/api/portraits/men/75.jpg',
        borderRadius: '8px'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 25,
        y: 30,
        width: 260,
        height: 35,
        scale: 1,
        content: 'Michael Chen',
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffffff'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 25,
        y: 70,
        width: 260,
        height: 20,
        scale: 1,
        content: 'CEO & Founder',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#f59e0b'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 25,
        y: 130,
        width: 350,
        height: 20,
        scale: 1,
        content: 'michael@company.io',
        fontSize: 13,
        fontWeight: 'normal',
        color: '#cccccc'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 25,
        y: 155,
        width: 350,
        height: 20,
        scale: 1,
        content: '+1 888 999 0000',
        fontSize: 13,
        fontWeight: 'normal',
        color: '#cccccc'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 25,
        y: 180,
        width: 350,
        height: 20,
        scale: 1,
        content: 'San Francisco, CA',
        fontSize: 13,
        fontWeight: 'normal',
        color: '#cccccc'
      }
    ]
  },
  {
    id: 'template-4',
    name: 'Colorful Creative',
    thumbnail: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=200&h=120&fit=crop',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    cardSize: { width: 400, height: 250 },
    elements: [
      {
        id: uuidv4(),
        type: 'decoration',
        x: 320,
        y: 160,
        width: 120,
        height: 120,
        scale: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '50%'
      },
      {
        id: uuidv4(),
        type: 'decoration',
        x: -30,
        y: -30,
        width: 100,
        height: 100,
        scale: 1,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: '50%'
      },
      {
        id: uuidv4(),
        type: 'image',
        x: 20,
        y: 85,
        width: 80,
        height: 80,
        scale: 1,
        content: 'https://randomuser.me/api/portraits/women/68.jpg',
        borderRadius: '50%',
        border: '3px solid white'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 120,
        y: 90,
        width: 260,
        height: 30,
        scale: 1,
        content: 'Sarah Creative',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 120,
        y: 120,
        width: 260,
        height: 20,
        scale: 1,
        content: 'Graphic Designer ✨',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffe0e8'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 120,
        y: 150,
        width: 260,
        height: 20,
        scale: 1,
        content: '@sarahcreative',
        fontSize: 12,
        fontWeight: 'normal',
        color: '#ffffff'
      }
    ]
  },
  {
    id: 'template-5',
    name: 'Nature Green',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=120&fit=crop',
    background: {
      type: 'image',
      value: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop'
    },
    cardSize: { width: 400, height: 250 },
    elements: [
      {
        id: uuidv4(),
        type: 'decoration',
        x: 0,
        y: 0,
        width: 400,
        height: 250,
        scale: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
      },
      {
        id: uuidv4(),
        type: 'image',
        x: 160,
        y: 25,
        width: 80,
        height: 80,
        scale: 1,
        content: 'https://randomuser.me/api/portraits/men/52.jpg',
        borderRadius: '50%',
        border: '3px solid #4ade80'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 50,
        y: 120,
        width: 300,
        height: 30,
        scale: 1,
        content: 'David Nature',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 50,
        y: 155,
        width: 300,
        height: 20,
        scale: 1,
        content: 'Environmental Consultant',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#4ade80',
        textAlign: 'center'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 50,
        y: 190,
        width: 300,
        height: 20,
        scale: 1,
        content: '🌿 david@ecoworld.org',
        fontSize: 13,
        fontWeight: 'normal',
        color: '#ffffff',
        textAlign: 'center'
      }
    ]
  },
  {
    id: 'template-6',
    name: 'Tech Futuristic',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&h=120&fit=crop',
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
    },
    cardSize: { width: 400, height: 250 },
    elements: [
      {
        id: uuidv4(),
        type: 'decoration',
        x: 350,
        y: 20,
        width: 40,
        height: 40,
        scale: 1,
        backgroundColor: 'transparent',
        border: '2px solid #00d9ff',
        borderRadius: '50%'
      },
      {
        id: uuidv4(),
        type: 'decoration',
        x: 10,
        y: 200,
        width: 30,
        height: 30,
        scale: 1,
        backgroundColor: 'transparent',
        border: '2px solid #00d9ff',
        borderRadius: '50%'
      },
      {
        id: uuidv4(),
        type: 'image',
        x: 20,
        y: 20,
        width: 70,
        height: 70,
        scale: 1,
        content: 'https://randomuser.me/api/portraits/women/22.jpg',
        borderRadius: '8px',
        border: '2px solid #00d9ff'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 110,
        y: 25,
        width: 230,
        height: 28,
        scale: 1,
        content: 'Alex Tech',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00d9ff'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 110,
        y: 55,
        width: 230,
        height: 20,
        scale: 1,
        content: 'AI Engineer',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffff'
      },
      {
        id: uuidv4(),
        type: 'decoration',
        x: 20,
        y: 110,
        width: 360,
        height: 1,
        scale: 1,
        backgroundColor: 'rgba(0,217,255,0.3)'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 20,
        y: 130,
        width: 360,
        height: 20,
        scale: 1,
        content: '⚡ alex@techfuture.io',
        fontSize: 13,
        fontWeight: 'normal',
        color: '#cccccc'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 20,
        y: 158,
        width: 360,
        height: 20,
        scale: 1,
        content: '🔗 github.com/alextech',
        fontSize: 13,
        fontWeight: 'normal',
        color: '#cccccc'
      },
      {
        id: uuidv4(),
        type: 'text',
        x: 20,
        y: 186,
        width: 360,
        height: 20,
        scale: 1,
        content: '💼 linkedin.com/in/alextech',
        fontSize: 13,
        fontWeight: 'normal',
        color: '#cccccc'
      }
    ]
  }
];

export const createEmptyTemplate = () => ({
  id: uuidv4(),
  name: 'Custom Template',
  thumbnail: '',
  background: {
    type: 'color',
    value: '#ffffff'
  },
  cardSize: { width: 400, height: 250 },
  elements: []
});
