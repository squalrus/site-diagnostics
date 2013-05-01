## Site Diagnostics

This diagnostic styling utilizes the styling and rules created by Eric Meyer ( http://meyerweb.com/eric/tools/css/diagnostics/ ).

There are three levels of integration in which the diagnostics can be used in a project.

### 1. Bookmark Button

This is the easiest and most straightforward use of the diagnostics. Drag the link to your bookmarks bar and run diagnostics on ANY site! Awesome!

### 2. Installing in application

Include the JavaScript file in your application and run the diagnostics with easy commands in your browser's console window.

#### Current API

    diagnostics.run()

Details: Execute the current styling rules by adding them to the page.

    diagnostics.rules()

Details: Show a panel of the current styling rules applied.

    diagnostics.key()

Details: Show a panel of a key for the styling rules applied.

    diagnostics.add('el1 in el2')

Details: Add a custom layout rule as a string. Use keyword 'in' to create the rule of 'element1 in element2'.

Example: diagnostics.add('.parent in .child') (will highlight parent if found in child)

#### Roadmap

    diagnostics.add('el1 with el2')

Details: Add a custom layout rule as a string. Use keyword 'with' to create the rule of 'element1 with element2'.

Example: diagnostics.add('.dark with .light') (will highlight element if light found with dark)

### 3. App

One script tag will refrence the files and have your site diagnosed with the latest and greatest version of the application.

This will also install a dashboard to be used for evaluating the markup of the software.
