// Check if luxon is already loaded, otherwise load it dynamically
if (typeof luxon === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/luxon@3.4.4/build/global/luxon.min.js';
    script.onload = function () {
      initTibiadrome();
    };
    document.head.appendChild(script);
  } else {
    initTibiadrome();
  }

  function initTibiadrome() {
    document.addEventListener('DOMContentLoaded', function () {
      setupTibiadrome();
      setInterval(updateTibiadrome, 60 * 1000);
    });
  }

  function setupTibiadrome() {
    const tibiadromeSection = document.getElementById('tibiadrome-section');
    if (tibiadromeSection) {
      tibiadromeSection.innerHTML = `
        <h2>Tibiadrome Rotation</h2>
        <table>
          <tbody>
            <tr>
              <td colspan="2"><b>Rotação Número <span id="tibiadrome_rot"></span></b></td>
            </tr>
            <tr>
              <td><b>Início:</b></td>
              <td><b>Fim:</b></td>
            </tr>
            <tr>
              <td id="tibiadrome_start">-</td>
              <td id="tibiadrome_end">-</td>
            </tr>
          </tbody>
        </table>
      `;
      updateTibiadrome();
    }
  }

  function updateTibiadrome() {
    const secondRotation = luxon.DateTime.fromSeconds(1627459200).setZone('Europe/Berlin'); // July 28, 2021 10:00:00 (CEST)
    const now = luxon.DateTime.now().setZone('Europe/Berlin');
    let rot = 2;
    for (let i = 0; secondRotation.plus({ days: i * 14 }) < now; i++) {
      rot = 2 + i;
    }

    const start = luxon.DateTime.fromSeconds(secondRotation.plus({ days: (rot - 2) * 14 }).toSeconds());
    const end = luxon.DateTime.fromSeconds(secondRotation.plus({ days: (rot - 1) * 14 }).toSeconds());

    const f = {
      ...luxon.DateTime.DATETIME_SHORT,
      timeZoneName: 'short'
    };

    document.getElementById('tibiadrome_rot').textContent = `#${rot}`;
    document.getElementById('tibiadrome_start').textContent = `${start.toLocaleString(f)} (${start.toRelative()})`;
    document.getElementById('tibiadrome_end').textContent = `${end.toLocaleString(f)} (${end.toRelative()})`;
  }