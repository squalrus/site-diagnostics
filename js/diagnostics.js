/*
* Diagnostics
* @version 0.1.0
* @author Chad Schulz
*/
var diag = function() {

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
    'table:not([summary]) {outline: 5px solid red;}',
    'table[summary=""] {outline: 3px dotted red;}',
    'th {border: 2px solid red;}',
    'th[scope="col"], th[scope="row"] {border: none;}',
    'a[href]:not([title]) {border: 5px solid red;}',
    'a[title=""] {outline: 3px dotted red;}',
    'a[href="#"] {background: lime;}',
    'a[href=""] {background: fuchsia;}'
  ];

  // Key listing
  this.k = []

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
  var style =[];

  for (var i=0; i<this.r.length; i++) {
   style.push('<p>' + this.r[i] + '</p>');
  }

  p.innerHTML = style.join('');

  document.body.appendChild(p);

  // Logging
  console.log('Show Rules Panel...');

};

/*
 * key() shows the key
 */
diag.prototype.key = function() {


  // Logging
  console.log('Show key...');
};


// Attach instance of diagnostics
window.diagnostics = window.diagnostics || new diag;

(function() {
  diagnostics.run();
  diagnostics.rules();
})();