# Site Diagnostics

THis diagnostic styling utilizes the styling and rules created by Eric Meyer ( http://meyerweb.com/eric/tools/css/diagnostics/ ).

There are three levels of integration in which the diagnostics can be used in a project.

### 1. Bookmark Button

This is the easiest and most straightforward use of diagnostics. Use the provided link as a shortcut in your browser and run the most basic implementation on ANY site! Awesome!

### 2. Installing in application

Include the JavaScript file in your application and start up the diagnostic feates with easy commands in your console window.

`diagnostics.run()` will run your markup through the styling rules

`diagnostics.rules()` will show a panel with the current styling rules applied

`diagnostics.key()` will show a panel with a key for the styling rules applied

`diagnostics.add('el1 in el2')` will allow the addition of layout rules [COMING SOON]

### 3. App

One `<script>` tag will refrence the files and have your site diagnosed with the latest and greatest version of the application.

[COMING SOON]