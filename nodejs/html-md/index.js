var TurndownService = require("turndown");

var turndownService = new TurndownService();
var markdown = turndownService.turndown(`
  <h1>THis is a heading</h1>
    <p>This is a paragraph</p>
    <hr />
    
    <p>It aims to be <a href="http://commonmark.org/" target="_blank" rel="noopener">CommonMark</a>
     compliant, and includes options to style the output. These options include:</p>
    
    <ul>
      <li>headingStyle (setext or atx)</li>
      <li>horizontalRule (*, -, or _)</li>
      <li>bullet (*, -, or )</li>
      <li>codeBlockStyle (indented or fenced)</li>
      <li>fence (or ~)</li>
      <li>emDelimiter (_ or *)</li>
      <li>strongDelimiter (** or __)</li>
      <li>linkStyle (inlined or referenced)</li>
      <li>linkReferenceStyle (full, collapsed, or shortcut)</li>
    </ul>`);

console.log(markdown);
