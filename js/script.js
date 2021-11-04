const ApiKey = "afbed895-141b-4efe-bbbc-60527d7c4280";
const baseUrl = "https://api.pokemontcg.io/v2/";
const cardEndPoin = `${baseUrl}cards/`;
const setEndPoin = `${baseUrl}sets/`;

const contents = document.querySelector("#konten");
const title = document.querySelector(".judul");
const fetchHeader = {
    headers: {
        'X-Api-Key': ApiKey
    }
};

function getListCards() {
    title.innerHTML="Daftar Pokemon";
    fetch(cardEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data)
            let pokes = "";
            resJson.data.forEach(poke => {
                pokes += `
                <div class="col s12 m3">
                    <div class="card">
                        <div class="card-image">
                            <img src="${poke.images.small}" style="height: 270px; object-fit: contain">
                        </div>
                        <div class="card-content" style="height: 100px; overflow: auto">
                            <p>Name : ${poke.name}</p>
                            <p>Rarity : ${poke.rarity}</p>
                        </div>
                        <div class="card-action">
                            <a href="#" data-id="${poke.id}" class="details">Details</a>
                        </div>
                    </div>
                </div>               
                `;
            });

            contents.innerHTML = `
            <div class="row">
                ${pokes}
            </div>
            `

            const detil = document.querySelectorAll('.details');
            detil.forEach(btn=>{
                btn.onclick=(event)=>{
                    getDetails(event.target.dataset.id);
                }
            })

        }).catch(err => {
            console.error(err);
        })
}

function getDetails(id) {
    const detailEndPoin = `${baseUrl}cards/${id}`;
    fetch(detailEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            title.innerHTML= `${resJson.data.name}`;

            //menampilkan attacks
            let attacks = "none";
            if(resJson.data.attacks != null) {
                attacks = "";
                resJson.data.attacks.forEach(attack => {
                    attacks += `
                        <li class="collection-item">
                            <p>${attack.name} (cost : ${attack.convertedEnergyCost})</p>
                            <p>${attack.text}</p>
                        </li>
                    `;
                });
            }

            //menampilkan weaknesses
            let weaknesses = "none";
            if(resJson.data.weaknesses != null) {
                weaknesses = "";
                resJson.data.weaknesses.forEach(weakness => {
                    weaknesses += `
                    <li class="collection-item">
                        <p>${weakness.type} : ${weakness.value}</p>
                    </li>
                    `;
                });
            }
            
            //menampilkan resistances
            let resistances = "none";
            if (resJson.data.resistances != null) {
                resistances = "";
                resJson.data.resistances.forEach(resistance => {
                    resistances += `
                    <li class="collection-item">
                        <p>${resistance.type} : ${resistance.value}</p>
                    </li>
                    `;
                });
            }

            //menampilkan subtypes
            let subtypes = "none";
            if (resJson.data.subtypes != null) {
                subtypes = "";
                resJson.data.subtypes.forEach(subtype => {
                    subtypes += `
                        ${subtype} ;
                    `;
                });
            }

            //menampilkan types
            let types = "none";
            if(resJson.data.types != null) {
                types = "";
                resJson.data.types.forEach(type => {
                    types += `
                        ${type} ;
                    `;
                });
            }

            contents.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col s6" style="text-align:center;">
                        <img src="${resJson.data.images.small}" alt="">
                    </div>
                    <div class="col s6" style="padding-top: 40px; padding-left: 30px">
                        <table class="responsive-table">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>: ${resJson.data.name}</td>
                                </tr>
                                <tr>
                                    <td>Level (HP)</td>
                                    <td>: ${resJson.data.level} (${resJson.data.hp})</td>
                                </tr>
                                <tr>
                                    <td>Supertype</td>
                                    <td>: ${resJson.data.supertype}</td>
                                </tr>
                                <tr>
                                    <td>Subtypes</td>
                                    <td>: ${subtypes}</td>
                                </tr>
                                <tr>
                                    <td>Types</td>
                                    <td>: ${types}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                <div class="row">
                    <h5>Attacks</h5>
                    <ul class="collection">
                        ${attacks}
                    </ul>
                </div>
                <div class="row">
                    <h5>Weaknesses</h5>
                    <ul class="collection">
                        ${weaknesses}
                    </ul>
                </div>
                <div class="row">
                    <h5>Resistances</h5>
                    <ul class="collection">
                        ${resistances}
                    </ul>
                </div>
            </div>
            `

            const detil = document.querySelectorAll('.details');
            detil.forEach(btn=>{
                btn.onclick=(event)=>{
                    showTeamInfo(event.target.dataset.id);
                }
            })

        }).catch(err => {
            console.error(err);
        })
}

function getSets() {
    title.innerHTML="Daftar Set";
    fetch(setEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data)
            let sets = "";
            resJson.data.forEach(set => {
                sets += `
                <li class="collection-item avatar">
                    <img src="${set.images.logo}" alt="" class="circle">
                    <span class="title">${set.name} (${set.series})</span>
                    <p>Total : ${set.total}</p>
                </li>             
                `;
            });

            contents.innerHTML = '<ul class="collection">' + sets + '</ul>'
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "cards":
            getListCards();
            break;
        case "sets":
            getSets();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "cards";
    loadPage(page);
});
