// This function updates the previewer with <textarea> content //
const updatePreview = () => {

    let editorContent = $("#editor").val();
    let previewContent = marked(editorContent);
    $("#preview").html(previewContent);
};


// This function creates a downloadable .md file //
const saveTextAsFile = () => {

    let content = $("#editor").val().replace(/\n/g, "\r\n");
    let blob = new Blob([content], {type: "text/plain"});
    let anchor = $("<a/>", {
        download: "my-markdown.md",
        href: URL.createObjectURL(blob),
        target: "_blank",
    });
    anchor.appendTo("body")[0].click();
    $(window).one("focus", function() {
        $("a").last().remove();
    });
};


// The defaultContent will be shown on the <textarea> and rendered as markdown when document first loads //
const defaultContent =`\
# Hello!
## Welcome to my Markdown Previewer

A **freeCodeCamp** project from the _Front End Development Libraries Certification_ created with Bootstrap and jQuery
___

Enter GitHub Flavored Markdown into the editor and see it rendered in real time into HTML in the preview. Check out some useful information below.
___

In addition to **headers** and **emphasized text**, you can also write lists:

* Write an unordered list;
* Like this one;
* And you can also write an ordered one:
    1. just
    2. like
    3. this

___

Write inline codes:

\`<div>This is an inline code</div>\`

And also blocks of code:

\`\`\`
function codeBlock() {
    if (useCorrectSyntax) {
        return "This is a code block";
    };
};
\`\`\`
___

You can write [links](https://bit.ly/3nsAWmc) and block quotes:

> This is a block quote

And even tables like this one:

These | Are | Headers
------------ | ------------- | -------------
This | is the | content
More | and more | content
Even | more | content
___

Finally, this is how you can display an image:

![img](https://bit.ly/3nuqlXU)
___

There's a lot more you can do with GitHub Flavored Markdown.
Make sure you check out [this](https://bit.ly/2ZtVB0Y) quick guide and also [this](https://www.markdownguide.org/getting-started/) detailed Markdown explanation.`;


// When document is ready //
$(document).ready(function() {
    
    // If screen width is less than 992px the position of the "Preview" title changes for styling purposes
    if ($(window).width() < 992) {
        $("#preview-title").insertAfter("#editor-container");
    };

    // The editor is filled with the defaultContent and the preview is updated for the first time
    $("#editor").val(defaultContent);
    updatePreview();

    // Each new input on editor triggers an update in the preview area
    $("#editor").on("input", updatePreview);

    // Download button
    $("#button").on("click", saveTextAsFile);

    // Tab key indent text instead of jumping to next field
    $("#editor").on("keydown", function(e) {
        
        if (e.key == 'Tab') {
            e.preventDefault();
            let start = this.selectionStart;
            let end = this.selectionEnd;
            this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        };
    });

});