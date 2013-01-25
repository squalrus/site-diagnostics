/*
* diagnostics full js
* Freely distributed under the MIT license.
* @version 0.1.0
* @author Chad Schulz
*/
var diag = function() {

  this.VERSION = '0.1.0';

  // List of styling rules
  this._r = [
    'div:empty, span:empty,',
    'li:empty, p:empty,',
    'td:empty, th:empty {padding: 0.5em; background: yellow;}',

    '*[style], font, center {outline: 5px solid red;}',
    '*[class=""], *[id=""] {outline: 5px dotted red;}',

    'img[alt=""] {border: 3px dotted red;}',
    'img:not([alt]) {border: 5px solid red;}',

    'img[title=""] {outline: 3px dotted fuchsia;}',
    'img:not([title]) {outline: 5px solid fuchsia;}',

    'table[summary=""] {outline: 3px dotted red;}',
    'table:not([summary]) {outline: 5px solid red;}',

    'th {border: 2px solid red;}',
    'th[scope="col"], th[scope="row"] {border: none;}',

    'a[href]:not([title]) {border: 5px solid red;}',
    'a[title=""] {outline: 3px dotted red;}',
    'a[href="#"] {background: lime;}',
    'a[href=""] {background: fuchsia;}'
  ];

  // Key listing
  this._k = [
    ['Empty element: ', 'yellow background', 'yellow'],
    ['Inline styling: ', 'solid red border', 'red'],
    ['Empty class or id: ', 'dotted red border', 'red'],
    ['&lt;img&gt; empty alt: ', 'dotted red border', 'red'],
    ['&lt;img&gt; missing alt: ', 'solid red border', 'red'],
    ['&lt;img&gt; empty title: ', 'dotted fuchsia border', 'fuchsia'],
    ['&lt;img&gt; missing title: ', 'solid fuchsia border', 'fuchsia'],
    ['&lt;table&gt; empty summary: ', 'dotted red border', 'red'],
    ['&lt;table&gt; missing summary: ', 'solid red border', 'red'],
    ['&lt;th&gt; mis-set scope: ', 'solid red border', 'red'],
    ['&lt;a&gt; missing title: ', 'solid red border', 'red'],
    ['&lt;a&gt; empty title: ', 'dotted red border', 'red'],
    ['&lt;a&gt; href set to #: ', 'lime background', 'lime'],
    ['&lt;a&gt; empty href: ', 'fuchsia background', 'fuchsia'],
    ['Custom bad layout: ', 'aqua background', 'aqua']
  ];

  // Custom highlighting
  this._highlite = '{border: 5px solid aqua;}';

  this.initialize();
};


diag.prototype.initialize = function() {
  this.buildDashboard();

  console.log('do stuff');
};

diag.prototype.buildDashboard = function() {

  // Build the dashboard element
  /*
  var dash = document.createElement('div');
  var dashboard = '<div class="diagnostics-dashboard"><div class="title">Diagnostics Dashboard</div><p>Use the dashboard to run, show the rules, or show the key.</p><p><a href="javascript:void(0)" id="diagnosticsRun" class="btn" title="Run Diagnostics">Run Diagnostics</a><a href="javascript:void(0)" id="diagnosticsRules" class="btn" title="Show Rules">Show Rules</a><a href="javascript:void(0)" id="diagnosticsKey" class="btn" title="Show Key">Show Key</a></p><p>Or add a friggin\' rule -- sweet!</p><p><input type="text" id="diag-first" size="12" /><select id="diag-verb"><option value="in">in</option><option value="with">with</option></select><input type="text" id="diag-second" size="12" /><a href="javascript:void(0)" id="diagnosticsAdd" class="btn" title="Add Rule">Add Rule</a></p></div>';

  dash.innerHTML = dashboard;

  document.body.appendChild(dash);
  */
  document.getElementById('diagnosticsToggle').addEventListener('click', function(event) {
      if (event.target.className === 'collapsed')
        diagnostics.show();
      else
        diagnostics.hide();
      event.preventDefault();
  });

  document.getElementById('diagnosticsRun').addEventListener('click', function(event) {
      diagnostics.run();
      event.preventDefault();
  });

  document.getElementById('diagnosticsRules').addEventListener('click', function(event) {
      diagnostics.rules();
      event.preventDefault();
  });

  document.getElementById('diagnosticsKey').addEventListener('click', function(event) {
      diagnostics.key();
      event.preventDefault();
  });

  document.getElementById('diagnosticsAdd').addEventListener('click', function(event) {
      var f = document.getElementById('diag-first').value,
          v = document.getElementById('diag-verb').value,
          s = document.getElementById('diag-second').value;

      diagnostics.add(f + ' ' + v + ' ' + s);
      event.preventDefault();
  });

};

diag.prototype.hide = function() {
  var dc = document.getElementById('diagnostics-content');
  dc.style.display = 'none';

  var btn = document.getElementById('diagnosticsToggle');
  btn.innerText = 'show';
  btn.className = 'collapsed';
  btn.title = 'show';
};

diag.prototype.show = function() {
  var dc = document.getElementById('diagnostics-content');
  dc.style.display = 'block';

  var btn = document.getElementById('diagnosticsToggle');
  btn.innerText = 'hide';
  btn.className = '';
  btn.title = 'hide';
};


/*
 * run() executes the diagnostic styling
 */
diag.prototype.run = function() {
  var s = document.createElement('style');
  s.innerHTML = this._r.join('');
  document.head.appendChild(s);

  // Logging
  console.log('Running diagnostics...');
};

/*
 * rules() shows the rule set
 */
diag.prototype.rules = function() {
  var p = document.createElement('div');
  p.className = 'diagnostics-panel-rules';
  var els =[];

  for (var i=0; i<this._r.length; i++) {
   els.push('<p>' + this._r[i] + '</p>');
  }

  p.innerHTML = els.join('');

  document.getElementById('diagnostics-content').appendChild(p);

  // Logging
  console.log('Show Rules Panel...');

};

/*
 * key() shows the key
 */
diag.prototype.key = function() {
  var p = document.createElement('div');
  var s = document.createElement('style');

  var key = [],
      sty = [];

  // Add class-based styling to the document
  for (var i=0; i<this._k.length; i++) {
   sty.push('.' + this._k[i][2] + '{color:'
    + this._k[i][2] + ';}');
  }
  s.innerHTML = sty.join('');

  for (var i=0; i<this._k.length; i++) {
   key.push('<p>' + this._k[i][0] + '<span class="'
    + this._k[i][2] + '">' + this._k[i][1] + '</span></p>');
  }

  p.innerHTML = key.join('');

  document.head.appendChild(s);
  document.getElementById('diagnostics-content').innerHTML = '';
  document.getElementById('diagnostics-content').appendChild(p);

  // Logging
  console.log('Show key...');
};

/*
 * add(rule)
 * @param <String> rule a rule to validate
 */
 diag.prototype.add = function(rule) {
  var elements = rule.split(' '),
      first = elements[0],
      second = elements[2],
      action = elements[1],
      fullRule;

  switch (action) {
    case 'in':
      fullRule = second + ' ' + first + ' ' + this.highlite;
      this._r.push(fullRule);
      break;
    case 'with':
      fullRule = second + first + ' ' + this.highlite;
      this._r.push(fullRule);
      break;
  }

  // Logging
  console.log('Adding rule: ' + fullRule);
 };


// Attach instance of diagnostics
window.diagnostics = window.diagnostics || new diag;