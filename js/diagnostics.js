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

};

diag.prototype.run = function() {
  var s = document.createElement('style');
  s.innerHTML = this.r.join('');
  document.head.appendChild(s);
};



window.diagnostics = window.diagnostics || new diag;

/*
 * run() executes the diagnostic styling
 */


(function() {
  // diagnostics.run();
})();