const footerInfo = document.getElementById("footerInfo");
const itemFooter = document.getElementById("itemFooter");
const socialMedia = document.getElementById("socialMedia");
const year = document.getElementById("year");
let cont = 0;

async function fetchData(url = `https://www.tuentrada.com/experiencia/footer/dinamico/dataFooter.json?v=${new Date().getTime()}`) {
  try {
    const res = await fetch(url, {
      // cache: 'force-cache',
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    // console.log({res})
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    // console.log({ fetchData: res });
    const data = await res.json();
    // console.log({data})
    return data;
  } catch (error) {
    console.log({ error });
  }
}

async function getData() {
  const res = await fetchData(
    // `./dataFooter.json`
  );
  const { data, socialnetworks } = res
//   console.log({ res });

  // Filtrar las páginas que están destinadas al pie de página
  const objectsFooter = data.filter((page) => page.where === "footer");

  // Obtener los nombres únicos de los tipos de página
  const typeNames = [...new Set(objectsFooter.map((item) => item.type.name))];
  const dataFooter = typeNames
    .map(
      (item) => `    
      <div class="col-md-4 col-12">
        <ul class="text-center p-0">
          <li class="titulo-footer pb-1">${item}</li>
          ${data
            .map((page) =>
              item === page.type.name
                ? `
                  <li key=${page.id} class="footer-li">                 
                    <a href=${
                      page.path.charAt(0) === "h"
                        ? page.path
                        : `https://ayuda.tuentrada.com${page.path}`
                    } target="_blank">
                      ${page.title}
                    </a>
                  </li>
                `
                : ""
            )
            .join("")}
        </ul>
      </div>    
    `
    )
    .join("");

  const itemsFooterTop = data.filter((item) => item.where === "footer-top");

  const dataItemsFooterTop = itemsFooterTop
    .map((item) => {
      cont++;
      return `
          <li key=${item.id}>
            <a href=${item.path} class="hover:underline" target="_blank">
              ${item.title}
            </a>
          </li>
          <li>${
            cont < itemsFooterTop.length
              // ? `<span style="padding: 0 7px">.</span>`
              ? `<span style="padding: 0 7px"><b>·</b></span>`
              : ""
          }</li>
        `;
    })
    .join("");


  const dataItemsSocialMedia = socialnetworks
    .map((item) => {
      return `
     <a
          
          href="${item.href}"
          target="_blank"
          title="Seguinos en "${item.type}""
          class="me-2"
        >
          <svg xmlns="${item.xmlns}" fill="${item.fill}" viewBox="${item.viewBox}" width="${item.width}" height="${item.height}" >
          <g transform="scale(8.53333,8.53333)"><path d="${item.path}" /></g> 
          </svg>
          
      </a>
    
    `;
    })
    .join("");

  year.innerHTML = new Date().getFullYear();
  footerInfo.innerHTML = dataFooter;
  itemFooter.innerHTML = dataItemsFooterTop;
  socialMedia.innerHTML = dataItemsSocialMedia;
}
getData();
