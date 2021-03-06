//
// Console greeting.
//
// Logs a Lift Interactive credit to the console.
//
export default function initGreeting() {
  const message = 'MADE BY LIFT | liftinteractive.com';

  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    const fancy = [
      '%c' + message,
      'background:#fff;color:#333;border:1px solid #333;line-height:6;padding:5px 10px;',
    ];

    window.console.log.apply(console, fancy);
  } else if (window.console) {
    window.console.log(message);
  }
}
