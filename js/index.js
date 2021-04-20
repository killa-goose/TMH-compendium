$(function() {
  // replaceTagName function to fix data-driven scrolling tabs
  (function (a) {
    a.fn.replaceTagName = function (f) {
      let g = [],
        h = this.length;
      while (h--) {
        let k = document.createElement(f),
          b = this[h],
          d = b.attributes;
        for (let c = d.length - 1; c >= 0; c--) {
          let j = d[c];
          k.setAttribute(j.name, j.value)
        }
        k.innerHTML = b.innerHTML;
        a(b).after(k).remove();
        g[h - 1] = k
      }
      return a(g)
    }
  })(window.jQuery);
  // Enable Popper.js Tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });
  $('#nightModeSwitch').click( function() {
    $('body').toggleClass('bootstrap bootstrap-dark');
  });
  let tabData = JSON.parse(document.getElementById('tabsJSON').innerHTML),
    tabsPP = tabData.map(function(i, v) {
      return function($li, $a) {
        $a.addClass('nav-link');
        $li.removeAttr('class');
        $a.replaceTagName("button");
      };
    });
  $('#navTabs').scrollingTabs({
    tabs: tabData,
    tabsPostProcessors: tabsPP,
    cssClassLeftArrow: "bi bi-chevron-left",
    cssClassRightArrow: "bi bi-chevron-right",
    disableScrollArrowsOnFullyScrolled: true,
    enableSwiping: true,
    ignoreTabPanes: true,
    scrollToTabEdge: true,
    //widthMultiplier: 0.9
  });
  // Nav tab deep-linking

  let url = location.href.replace(/\/$/, "");
  if (location.hash) {
    const hash = url.split("#");
    $('#navTabs button[href="#'+hash[1]+'"]').tab("show");
    url = location.href.replace(/\/#/, "#");
    history.replaceState(null, null, url);
    setTimeout(() => {
      $(window).scrollTop(0);
    }, 400);
  } else {
    $('#navTabs button[href="#home"]').tab("show");
  }
  $('button[data-bs-toggle="tab"]').on("click", function() {
    let tabUrl;
    const hash = $(this).attr("href");
    if(hash == "#home") {
      tabUrl = url.split("#")[0];
    } else {
      tabUrl = url.split("#")[0] + hash;
      tabUrl += "/";
    }
    history.replaceState(null, null, tabUrl);
  });
  // Extend Backbone Model with Backbone.Validation mixin
  //_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
  // Initialise Backbone collections & views
  var Championships = new ChampionshipsCollection();
  var champsView = new ChampionshipView({collection: Championships});
  Championships.fetch({reset: true});
  var Wrestlers = new WrestlersCollection();
  //var gymView = new GymView({collection: Wrestlers});
  Wrestlers.fetch({reset: true});
  var gymView = new Backbone.CollectionView({
    el: $('#gym'),
    selectable: true,
    sortable: true,
    sortableOptions: {
      axis: "x y",
      placeholder: "gym-placeholder"
    },
    collection: Wrestlers,
    modelView: GymWrestlerView
  });
  gymView.render();
  var wrestlerView = new WrestlerInfoView({collection: Wrestlers});
});