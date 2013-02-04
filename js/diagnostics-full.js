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

diag.prototype.log = function(msg) {
  if(console && console.log) {
    console.log('Site Diagnosics: ' + msg);
  }
};


diag.prototype.initialize = function() {
  this.buildDashboard();

  this.log('Initializing');
};

/*
 * run() executes the diagnostic styling
 */
diag.prototype.run = function() {
  var s = document.createElement('style');
  s.innerHTML = this._r.join('');
  document.head.appendChild(s);

  // Logging
  this.log('Running Diagnostics');
};

diag.prototype.buildDashboard = function() {

  // Build the dashboard element
  var title = ['<div class="title">Diagnostics</div>',
              '<a href="javascript:void(0)" id="diagnosticsRun" class="btn" title="Run Diagnostics">Run Diagnostics</a>'];

  var dashboard = document.getElementById('diagnostics-title');

  dashboard.innerHTML = title.join('');


  var self = this;

  document.getElementById('diagnosticsRun').addEventListener('click', function(event) {
      self.run();
      event.preventDefault();
  });

  document.getElementById('diagnosticsToggle').addEventListener('click', function(event) {
      if (event.target.className === 'collapsed')
        self.show();
      else
        self.hide();
      event.preventDefault();
  });

  document.getElementById('diagnosticsAdd').addEventListener('click', function(event) {
      self.showAdd();
      event.preventDefault();
  });

  document.getElementById('diagnosticsRules').addEventListener('click', function(event) {
      self.showRules();
      event.preventDefault();
  });

  document.getElementById('diagnosticsKey').addEventListener('click', function(event) {
      self.showKey();
      event.preventDefault();
  });

  //logging
  this.log('Building Dashboard');

};

/*
 * hide() Hide the Diagnostics panel
 */
diag.prototype.hide = function() {
  var dc = document.getElementById('diagnostics-content');
  dc.style.display = 'none';

  var btn = document.getElementById('diagnosticsToggle');
  btn.innerText = 'show';
  btn.className = 'collapsed';
  btn.title = 'show';

  this.log('Hiding Diagnostics');
};

/*
 * show() Show the Diagnostics panel
 */
diag.prototype.show = function() {
  var dc = document.getElementById('diagnostics-content');
  dc.style.display = 'block';

  var btn = document.getElementById('diagnosticsToggle');
  btn.innerText = 'hide';
  btn.className = '';
  btn.title = 'hide';

  this.log('Showing Diagnostics');
};

/*
 * showRules() Show the rule set
 */
diag.prototype.showRules = function() {
  var p = document.createElement('div');

  var els =[];

  for (var i=0; i<this._r.length; i++) {
   els.push('<p>' + this._r[i] + '</p>');
  }

  p.innerHTML = els.join('');

  document.getElementById('diagnostics-content').innerHTML = '';
  document.getElementById('diagnostics-content').appendChild(p);

  // Logging
  this.log('Showing Rules Panel');

};

/*
 * showKey() Show the key
 */
diag.prototype.showKey = function() {
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
  this.log('Showing Key Panel');
};

/*
 * showAdd() Show the add panel
 */
diag.prototype.showAdd = function() {
  var p = document.createElement('div');
      content = ['<input type="text" id="diag-first" size="12" />',
                '<select id="diag-verb">',
                '    <option value="in">in</option>',
                '    <option value="with">with</option>',
                '</select>',
                '<input type="text" id="diag-second" size="12" />',
                '<a href="javascript:void(0)" id="diagnosticsAddRule" class="btn" title="Add Rule">Add Rule</a>'];
  p.innerHTML = content.join('');

  document.getElementById('diagnostics-content').innerHTML = '';
  document.getElementById('diagnostics-content').appendChild(p);

  document.getElementById('diagnosticsAddRule').addEventListener('click', function(event) {
      var f = document.getElementById('diag-first').value,
          v = document.getElementById('diag-verb').value,
          s = document.getElementById('diag-second').value;

      self.add(f + ' ' + v + ' ' + s);
      event.preventDefault();
  });

  // Logging
  this.log('Showing Add Panel');
};

/*
 * add(rule) Adds a new custom rule to the set
 * @param <String> rule A rule to validate upon
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
  this.log('Adding Rule --> ' + fullRule);
 };


// Attach instance of diagnostics
window.diagnostics = window.diagnostics || new diag;