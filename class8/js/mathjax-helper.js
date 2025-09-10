// mathjax-helper.js
// Put this in js/mathjax-helper.js and include it after MathJax script in your pages.

// MathJax configuration (loads TeX input and common packages)
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    tags: 'ams',
    packages: {'[+]': ['mhchem']}
  },
  options: {
    renderActions: {
      addMenu: [0, '', '']
    }
  }
};

// Wait until MathJax script is loaded and then typeset
function typesetMath() {
  if (window.MathJax && window.MathJax.typesetPromise) {
    return window.MathJax.typesetPromise();
  } else {
    return Promise.resolve();
  }
}

// Auto-typeset on load
window.addEventListener('load', function () {
  typesetMath().catch(function (err) {
    console.warn('MathJax typeset failed:', err);
  });
});

// Helper: toggle a solution block (useful for multiple solutions)
function toggleSolution(id) {
  var el = document.getElementById(id);
  if (!el) return;
  if (el.style.display === 'none') {
    el.style.display = '';
  } else {
    el.style.display = 'none';
  }
}

// Helper: collapse all multiple-solution blocks inside given container
function initMultiSolutions(containerSelector) {
  var containers = document.querySelectorAll(containerSelector || '.mult-solutions');
  containers.forEach(function (c) {
    var options = c.querySelectorAll('.option');
    if (options.length <= 1) return;
    // hide all but first
    options.forEach(function (opt, i) {
      if (i !== 0) opt.style.display = 'none';
    });
    // build simple nav
    var nav = document.createElement('div');
    nav.className = 'mult-nav small-muted';
    options.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.style.margin = '0 6px 6px 0';
      btn.textContent = 'Method ' + (i+1);
      btn.onclick = function () {
        options.forEach(function (o) { o.style.display = 'none'; });
        options[i].style.display = '';
        // re-typeset math if needed
        typesetMath();
      };
      nav.appendChild(btn);
    });
    c.insertBefore(nav, c.firstChild);
  });
}

// Utility: show/hide rough-work box (used in division-method pages)
function attachRoughToggle(roughId, btnId) {
  var btn = document.getElementById(btnId);
  var box = document.getElementById(roughId);
  if (!btn || !box) return;
  btn.addEventListener('click', function () {
    box.style.display = (box.style.display === 'none') ? '' : 'none';
  });
}

// Small convenience: mark a DOM element as an important term programmatically
function markImportant(selector) {
  var el = document.querySelector(selector);
  if (el) el.classList.add('important-term');
}

// Expose helpers for pages
window.nbook = {
  typeset: typesetMath,
  toggleSolution: toggleSolution,
  initMultiSolutions: initMultiSolutions,
  attachRoughToggle: attachRoughToggle,
  markImportant: markImportant
};
