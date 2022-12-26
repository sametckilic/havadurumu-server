const element = document.querySelector('#svg-turkiye-haritasi');
const info = document.querySelector('.il-isimleri');

        element.addEventListener(
            'mouseover',
            function (event) {
                if (event.target.tagName === 'path') {
                    info.innerHTML = [
                        '<div>',
                        event.target.parentNode.getAttribute('data-iladi'),
                        '</div>'
                    ].join('');
                }
            }
        );

        element.addEventListener(
            'mousemove',
            function (event) {
                info.style.top = event.pageY + 25 + 'px';
                info.style.left = event.pageX + 'px';
            }
        );

        element.addEventListener(
            'mouseout',
            function (event) {
                info.innerHTML = '';
            }
        )
        element.addEventListener(
            'click',
            function (event) {
                if (event.target.tagName === 'path') {
                    const parent = event.target.parentNode;
                    const id = parent.getAttribute('id');
                    const plakaKodu = parent.getAttribute('data-plakakodu')

                    window.location.href = (
                        id
                    );
                }
            }
        );
        if(document.querySelector("#turkiye").hasChildNodes(document.querySelector("#cityStub"))){
            const city = document.querySelector("#"+document.querySelector("#cityStub").value).childNodes[1]
            city.style.fill = "#153652"
        }

       