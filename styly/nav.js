(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('hlavni-nav');
  if (!btn || !nav) return;
  // Odstraň hidden atribut — teď CSS řídí viditelnost (skryté na desktopu, viditelné na mobilu)
  btn.removeAttribute('hidden');
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('nav-open', !open);
  });
  // Zavři při kliknutí na odkaz
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      btn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('nav-open');
    }
  });
})();

// Česká typografie — nezalomitelná mezera za jednopísmenné předložky a spojky
(function () {
  var RE = /(^|[\s\u00A0])([aAiIeEkKsŠvVzZoOuU]) /g;
  function fixNode(node) {
    node.nodeValue = node.nodeValue.replace(RE, function (m, before, letter) {
      return before + letter + '\u00A0';
    });
  }
  function fixTree(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var tag = n.parentElement && n.parentElement.closest('code,pre,script,style,textarea');
        return tag ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) fixNode(walker.currentNode);
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.card, .hero').forEach(fixTree);
  });
})();
