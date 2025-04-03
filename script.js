
// Mock user document data
const userDocuments = [
  {
    id: 1,
    title: 'Passport',
    expires: new Date('2024-05-15'),
  },
  {
    id: 2,
    title: 'Driver License',
    expires: new Date('2024-08-22'),
  },
  {
    id: 3,
    title: 'Birth Certificate',
    expires: null,
  },
  {
    id: 4,
    title: 'Insurance Policy',
    expires: new Date('2025-01-10'),
  }
];

// DOM Elements
const documentsBtn = document.getElementById('documents-btn');
const findBtn = document.getElementById('find-btn');
const recentDocsContainer = document.getElementById('recent-docs-container');
const toast = document.getElementById('toast');
const toastCloseBtn = document.getElementById('toast-close');
const navItems = document.querySelectorAll('.nav-item');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Render recent documents
  renderRecentDocuments();
  
  // Show notification toast after 3 seconds
  setTimeout(() => {
    showToast();
  }, 3000);
  
  // Set up event listeners
  setupEventListeners();
});

// Render the recent documents section
function renderRecentDocuments() {
  // Get only the first 2 documents for the recent section
  const recentDocs = userDocuments.slice(0, 2);
  
  recentDocsContainer.innerHTML = '';
  
  recentDocs.forEach(doc => {
    const docElement = document.createElement('div');
    docElement.className = 'document-card';
    
    docElement.innerHTML = `
      <div class="document-icon">
        ${doc.title.substring(0, 1)}
      </div>
      <div class="document-info">
        <h3>${doc.title}</h3>
        <p>${doc.expires 
          ? `Expires: ${formatDate(doc.expires)}` 
          : 'No expiration date'}</p>
      </div>
    `;
    
    recentDocsContainer.appendChild(docElement);
  });
}

// Format date to a user-friendly string
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

// Show the toast notification
function showToast() {
  toast.classList.add('show');
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    hideToast();
  }, 5000);
}

// Hide the toast notification
function hideToast() {
  toast.classList.remove('show');
}

// Set up all event listeners
function setupEventListeners() {
  // Document buttons
  documentsBtn.addEventListener('click', () => {
    // In a full app, this would navigate to the documents page
    alert('Navigate to My Documents page');
  });
  
  findBtn.addEventListener('click', () => {
    // In a full app, this would navigate to the find page
    alert('Navigate to Lost & Found page');
  });
  
  // Toast close button
  toastCloseBtn.addEventListener('click', hideToast);
  
  // Navigation items
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all items
      navItems.forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      // Add active class to clicked item
      item.classList.add('active');
      
      // In a full app, this would navigate to the respective page
      const pageName = item.querySelector('span').textContent;
      if (pageName !== 'Home') {
        alert(`Navigate to ${pageName} page`);
      }
    });
  });
}
