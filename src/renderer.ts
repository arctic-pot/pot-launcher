// import another file to load
import './RenderReact';
import './utilityClass.scss';
import 'animate.css/animate.compat.css';
import './index.scss';

document.addEventListener('keydown', (event) => {
  if (event.key === 'F4') {
    document.getElementById('root').innerHTML =
      '<div style="color: #f5222d; height: 100%; overflow: auto">' +
      '</div>';
  }
  if (event.key === 'F5') {
    location.reload();
  }
});
