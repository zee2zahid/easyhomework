// responsive-helper.js
// Utility functions for responsive design

/**
 * Updates a font size indicator (for testing responsiveness)
 */
function updateFontSizeIndicator() {
  const indicator = document.getElementById('font-size-indicator');
  if (indicator) {
    const htmlFontSize = getComputedStyle(document.documentElement).fontSize;
    const bodyFontSize = getComputedStyle(document.body).fontSize;
    indicator.textContent = `HTML Font: ${htmlFontSize}, Body Font: ${bodyFontSize}`;
  }
}

/**
 * Creates a responsive font size indicator for testing
 */
function createFontSizeIndicator() {
  // Create indicator for testing
  const indicator = document.createElement('div');
  indicator.id = 'font-size-indicator';
  indicator.style.position = 'fixed';
  indicator.style.bottom = '10px';
  indicator.style.right = '10px';
  indicator.style.background = 'rgba(0,0,0,0.7)';
  indicator.style.color = 'white';
  indicator.style.padding = '5px';
  indicator.style.borderRadius = '3px';
  indicator.style.fontSize = '12px';
  indicator.style.zIndex = '1000';
  document.body.appendChild(indicator);
  
  updateFontSizeIndicator();
}

/**
 * Adjusts MathJax rendering on resize for better mobile experience
 */
function handleMathJaxResize() {
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise().catch(function(err) {
      console.warn('MathJax typeset during resize failed:', err);
    });
  }
}

/**
 * Initializes all responsive helpers
 */
function initResponsiveHelpers() {
  // Create font size indicator
  createFontSizeIndicator();
  
  // Update indicator on resize
  window.addEventListener('resize', function() {
    updateFontSizeIndicator();
    handleMathJaxResize();
  });
  
  // Re-typeset MathJax after a brief delay on load to ensure proper rendering
  setTimeout(function() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, 500);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initResponsiveHelpers);
} else {
  initResponsiveHelpers();
}

// Expose functions for manual control
window.responsiveHelpers = {
  updateFontSizeIndicator,
  createFontSizeIndicator,
  handleMathJaxResize,
  initResponsiveHelpers
};