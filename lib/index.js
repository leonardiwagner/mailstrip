/*
Strip email to keep only the actual reply
*/

RegExp.escape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

/*
sender: sender email
text  : text body
*/


module.exports = function(sender, text) {
  var email, exp, index, m;
  email = RegExp.escape(sender);
  text = text.replace(/^>.*$/gm, '');
  exp = RegExp("From:\\s*" + email + "|<" + email + ">|On.*\\s*.*wrote:|-+original\\s+message-+|\\s+Sent\\s+from\\s+my.*|\\n.*" + 'reply above this line' + "|--\\n.*", "gi");
  m = exp.exec(text);
  index = m ? m.index : text.length;
  return text.slice(0, index).trim();
};