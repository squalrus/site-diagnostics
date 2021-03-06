/*
* Diagnostics
* @version 0.9.0
* @author Chad Schulz
*/
var diag = function() {

  this.VERSION = '0.9.0';

  // List of styling rules
  this.r = [
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
  this.k = [
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
  this.highlite = '{border: 5px solid aqua;}';

};

/*
 * run() executes the diagnostic styling
 */
diag.prototype.run = function() {
  var s = document.createElement('style');
  s.innerHTML = this.r.join('');
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

  for (var i=0; i<this.r.length; i++) {
   els.push('<p>' + this.r[i] + '</p>');
  }

  p.innerHTML = els.join('');

  document.body.appendChild(p);

  // Logging
  console.log('Show Rules Panel...');

};

/*
 * key() shows the key
 */
diag.prototype.key = function() {
  var p = document.createElement('div');
  var s = document.createElement('style');
  p.className = 'diagnostics-panel-key';

  var key = [],
      sty = [];

  // Add class-based styling to the document
  for (var i=0; i<this.k.length; i++) {
   sty.push('.' + this.k[i][2] + '{color:'
    + this.k[i][2] + ';}');
  }
  s.innerHTML = sty.join('');

  for (var i=0; i<this.k.length; i++) {
   key.push('<p>' + this.k[i][0] + '<span class="'
    + this.k[i][2] + '">' + this.k[i][1] + '</span></p>');
  }

  p.innerHTML = key.join('');

  document.head.appendChild(s);
  document.body.appendChild(p);

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
      action = elements[1];

  switch (action) {
    case 'in':
      this.r.push(second + ' ' + first + this.highlite);
      break;
  }

  // Logging
  console.log('Adding rule: ' + second + ' ' + first + this.highlite);
 };


// Attach instance of diagnostics
window.diagnostics = window.diagnostics || new diag;