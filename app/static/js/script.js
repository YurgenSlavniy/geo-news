$(document).ready(function() {
    var countryCodes = []

    function clearSelectionOnMap() {
        for (var i = 0; i < countryCodes.length; i++) {
            var id = countryCodes[i]
            var newData = {
                "areas": {}
            }
            newData.areas[id] = {
                attrs: {
                    fill: "#343434"
                }
            };
            $(".map_container").trigger('update', [{ mapOptions: newData }]);
        }
        console.log("countryCodes, close action", countryCodes)
        countryCodes = []
        console.log("countryCodes, close action", countryCodes)
    }

    // открывает дополнительные окна
    for (let i = 1; i <= 5; i++) {
        $("#link-" + i).on("click", function(e) {
            e.preventDefault()
            $("#map-container").hide(500);
            $("#news-container").hide(500);
            for (let j = 1; j <= 5; j++) {
                $("#block-" + j).hide();
            }
            $("#block-" + i).show(500);
        });
    }
    // закрывает дополнительные окна
    $(".block-close").click(function(e) {
        var n = $(this).data("block")
        $("#block-" + n).hide(500);
        $("#map-container").show(500);
        clearSelectionOnMap()
    });

    // получает новости и отображает их
    function fetchNews(leftID, rightID) {
        $.ajax({
            url: "/parse/news/" + leftID + "/" + rightID + "/",
            method: "GET",
        }).done(function(response) {
            try {
                response = JSON.parse(response);
                var leftContent = response.left
                var rightContent = response.right
            } catch (err) {
                console.error(err);
                return;
            }

            function getHTML(response) {
                var html = '';
                for (var i = 0; i < response.length; i++) {
                    html += "<div class='card' style='margin: 10px 0 0 0;'>";
                    html += "<h5><a href='" + response[i][1] + "'>" + i + " " + response[i][0]
                    html += "</a></h5>";
                    html += "</div>";
                }
                return html
            }
            $("#news-title-win").text("Новости " + leftID + ", " + rightID)
            $("#left-content").html(getHTML(leftContent))
            $("#right-content").html(getHTML(rightContent))
        }).catch(function(err) {
            console.log(err)
        })
    }

    // закрывает блок с новостями
    $("#news-close").on("click", function(e) {
        $("#map-container").show(500);
        $("#news-container").hide(500);
        clearSelectionOnMap()
    });

    // отображение карты
    $(".map_container").mapael({
        map: {
            name: "world_countries",
            zoom: {
                enabled: true,
                maxLevel: 10
            },
            defaultArea: {
                attrs: {
                    // fill: "#5ba4ff",
                    // stroke: "#99c7ff",
                    cursor: "pointer"
                },
                attrsHover: {
                    animDuration: 0
                },
                text: {
                    attrs: {
                        cursor: "pointer",
                        "font-size": 10,
                        fill: "#000"
                    },
                    attrsHover: {
                        animDuration: 0
                    }
                },
                eventHandlers: {
                    click: function(e, id, mapElem, textElem) {
                        countryCodes.push(id)
                        if (countryCodes.length === 2) {
                            $("#map-container").hide(500)
                            $("#news-container").show(500)

                            fetchNews(countryCodes[0], countryCodes[1])
                            console.log("countryCodes, show action", countryCodes)
                        }
                        //
                        var newData = {
                            "areas": {}
                        }
                        newData.areas[id] = {
                            attrs: {
                                fill: "#5ba4ff"
                            }
                        };
                        $(".map_container").trigger('update', [{ mapOptions: newData }]);
                        // var newData = {
                        //     'areas': {}
                        // };
                        // if (mapElem.originalAttrs.fill == "#5ba4ff") {
                        //     newData.areas[id] = {
                        //         attrs: {
                        //             fill: "#343434"
                        //         }
                        //     };
                        // } else {
                        //     newData.areas[id] = {
                        //         attrs: {
                        //             fill: "#5ba4ff"
                        //         }
                        //     };

                        //     countries.push(id)
                        //     if (countries.length === 2) {
                        //         $("#map-container").hide(500)
                        //         $("#news-container").show(500)
                        //         $("#news-content").attr("data-areas", countries)
                        //         $("#news-content").text("Новости для " + countries.toString())
                        //         countries = []
                        //     }
                        // }
                        // $(".map_container").trigger('update', [{ mapOptions: newData }]);
                    }
                }
            }
        },
        areas: {
            "AF": {
                "value": "",
                "attrs": {
                    "href": "#",
                },
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Afghanistan<\/span><br \/>"
                }
            },
            "ZA": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">South Africa<\/span><br \/>"
                }
            },
            "AL": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Albania<\/span><br \/>"
                }
            },
            "DZ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Algeria<\/span><br \/>"
                }
            },
            "DE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Germany<\/span><br \/>"
                }
            },
            "AD": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Andorra<\/span><br \/>"
                }
            },
            "AO": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Angola<\/span><br \/>"
                }
            },
            "AG": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Antigua And Barbuda<\/span><br \/>"
                }
            },
            "SA": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Saudi Arabia<\/span><br \/>"
                }
            },
            "AR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Argentina<\/span><br \/>"
                }
            },
            "AM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Armenia<\/span><br \/>"
                }
            },
            "AU": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Australia<\/span><br \/>"
                }
            },
            "AT": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Austria<\/span><br \/>"
                }
            },
            "AZ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Azerbaijan<\/span><br \/>"
                }
            },
            "BS": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Bahamas<\/span><br \/>"
                }
            },
            "BH": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Bahrain<\/span><br \/>"
                }
            },
            "BD": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Bangladesh<\/span><br \/>"
                }
            },
            "BB": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Barbados<\/span><br \/>"
                }
            },
            "BE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Belgium<\/span><br \/>"
                }
            },
            "BZ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Belize<\/span><br \/>"
                }
            },
            "BJ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Benin<\/span><br \/>"
                }
            },
            "BT": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Bhutan<\/span><br \/>"
                }
            },
            "BY": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Belarus<\/span><br \/>"
                }
            },
            "MM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Myanmar<\/span><br \/>"
                }
            },
            "BO": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Bolivia, Plurinational State Of<\/span><br \/>"
                }
            },
            "BA": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Bosnia And Herzegovina<\/span><br \/>"
                }
            },
            "BW": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Botswana<\/span><br \/>"
                }
            },
            "BR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Brazil<\/span><br \/>"
                }
            },
            "BN": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Brunei Darussalam<\/span><br \/>"
                }
            },
            "BG": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Bulgaria<\/span><br \/>"
                }
            },
            "BF": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Burkina Faso<\/span><br \/>"
                }
            },
            "BI": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Burundi<\/span><br \/>"
                }
            },
            "KH": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Cambodia<\/span><br \/>"
                }
            },
            "CM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Cameroon<\/span><br \/>"
                }
            },
            "CA": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Canada<\/span><br \/>"
                }
            },
            "CV": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Cape Verde<\/span><br \/>"
                }
            },
            "CF": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Central African Republic<\/span><br \/>"
                }
            },
            "CL": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Chile<\/span><br \/>"
                }
            },
            "CN": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">China<\/span><br \/>"
                }
            },
            "CY": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Cyprus<\/span><br \/>"
                }
            },
            "CO": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Colombia<\/span><br \/>"
                }
            },
            "KM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Comoros<\/span><br \/>"
                }
            },
            "CG": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Congo<\/span><br \/>"
                }
            },
            "CD": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Congo, The Democratic Republic Of The<\/span><br \/>"
                }
            },
            "KP": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Korea, Democratic People's Republic Of<\/span><br \/>"
                }
            },
            "KR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Korea, Republic Of<\/span><br \/>"
                }
            },
            "CR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Costa Rica<\/span><br \/>"
                }
            },
            "CI": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Cudte D'ivoire<\/span><br \/>"
                }
            },
            "HR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Croatia<\/span><br \/>"
                }
            },
            "CU": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Cuba<\/span><br \/>"
                }
            },
            "DK": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Denmark<\/span><br \/>"
                }
            },
            "DJ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Djibouti<\/span><br \/>"
                }
            },
            "DM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Dominica<\/span><br \/>"
                }
            },
            "EG": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Egypt<\/span><br \/>"
                }
            },
            "AE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">United Arab Emirates<\/span><br \/>"
                }
            },
            "EC": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Ecuador<\/span><br \/>"
                }
            },
            "ER": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Eritrea<\/span><br \/>"
                }
            },
            "ES": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Spain<\/span><br \/>"
                }
            },
            "EE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Estonia<\/span><br \/>"
                }
            },
            "US": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">United States<\/span><br \/>"
                }
            },
            "ET": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Ethiopia<\/span><br \/>"
                }
            },
            "FJ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Fiji<\/span><br \/>"
                }
            },
            "FI": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Finland<\/span><br \/>"
                }
            },
            "FR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">France<\/span><br \/>"
                }
            },
            "GA": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Gabon<\/span><br \/>"
                }
            },
            "GM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Gambia<\/span><br \/>"
                }
            },
            "GE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Georgia<\/span><br \/>"
                }
            },
            "GH": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Ghana<\/span><br \/>"
                }
            },
            "GR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Greece<\/span><br \/>"
                }
            },
            "GD": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Grenada<\/span><br \/>"
                }
            },
            "GT": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Guatemala<\/span><br \/>"
                }
            },
            "GN": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Guinea<\/span><br \/>"
                }
            },
            "GQ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Equatorial Guinea<\/span><br \/>"
                }
            },
            "GW": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Guinea-bissau<\/span><br \/>"
                }
            },
            "GY": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Guyana<\/span><br \/>"
                }
            },
            "HT": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Haiti<\/span><br \/>"
                }
            },
            "HN": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Honduras<\/span><br \/>"
                }
            },
            "HU": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Hungary<\/span><br \/>"
                }
            },
            "JM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Jamaica<\/span><br \/>"
                }
            },
            "JP": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Japan<\/span><br \/>"
                }
            },
            "MH": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Marshall Islands<\/span><br \/>"
                }
            },
            "PW": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Palau<\/span><br \/>"
                }
            },
            "SB": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Solomon Islands<\/span><br \/>"
                }
            },
            "IN": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">India<\/span><br \/>"
                }
            },
            "ID": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Indonesia<\/span><br \/>"
                }
            },
            "JO": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Jordan<\/span><br \/>"
                }
            },
            "IR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Iran, Islamic Republic Of<\/span><br \/>"
                }
            },
            "IQ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Iraq<\/span><br \/>"
                }
            },
            "IE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Ireland<\/span><br \/>"
                }
            },
            "IS": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Iceland<\/span><br \/>"
                }
            },
            "IL": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Israel<\/span><br \/>"
                }
            },
            "IT": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Italy<\/span><br \/>"
                }
            },
            "KZ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Kazakhstan<\/span><br \/>"
                }
            },
            "KE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Kenya<\/span><br \/>"
                }
            },
            "KG": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Kyrgyzstan<\/span><br \/>"
                }
            },
            "KI": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Kiribati<\/span><br \/>"
                }
            },
            "KW": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Kuwait<\/span><br \/>"
                }
            },
            "LA": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Lao People's Democratic Republic<\/span><br \/>"
                }
            },
            "LS": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Lesotho<\/span><br \/>"
                }
            },
            "LV": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Latvia<\/span><br \/>"
                }
            },
            "LB": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Lebanon<\/span><br \/>"
                }
            },
            "LR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Liberia<\/span><br \/>"
                }
            },
            "LY": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Libya<\/span><br \/>"
                }
            },
            "LI": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Liechtenstein<\/span><br \/>"
                }
            },
            "LT": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Lithuania<\/span><br \/>"
                }
            },
            "LU": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Luxembourg<\/span><br \/>"
                }
            },
            "MK": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Macedonia, The Former Yugoslav Republic Of<\/span><br \/>"
                }
            },
            "MG": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Madagascar<\/span><br \/>"
                }
            },
            "MY": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Malaysia<\/span><br \/>"
                }
            },
            "MW": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Malawi<\/span><br \/>"
                }
            },
            "MV": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Maldives<\/span><br \/>"
                }
            },
            "ML": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Mali<\/span><br \/>"
                }
            },
            "MT": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Malta<\/span><br \/>"
                }
            },
            "MA": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Morocco<\/span><br \/>"
                }
            },
            "MU": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Mauritius<\/span><br \/>"
                }
            },
            "MR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Mauritania<\/span><br \/>"
                }
            },
            "MX": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Mexico<\/span><br \/>"
                }
            },
            "FM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Micronesia, Federated States Of<\/span><br \/>"
                }
            },
            "MD": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Moldova, Republic Of<\/span><br \/>"
                }
            },
            "MC": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Monaco<\/span><br \/>"
                }
            },
            "MN": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Mongolia<\/span><br \/>"
                }
            },
            "ME": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Montenegro<\/span><br \/>"
                }
            },
            "MZ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Mozambique<\/span><br \/>"
                }
            },
            "NA": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Namibia<\/span><br \/>"
                }
            },
            "NP": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Nepal<\/span><br \/>"
                }
            },
            "NI": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Nicaragua<\/span><br \/>"
                }
            },
            "NE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Niger<\/span><br \/>"
                }
            },
            "NG": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Nigeria<\/span><br \/>"
                }
            },
            "NO": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Norway<\/span><br \/>"
                }
            },
            "NZ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">New Zealand<\/span><br \/>"
                }
            },
            "OM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Oman<\/span><br \/>"
                }
            },
            "UG": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Uganda<\/span><br \/>"
                }
            },
            "UZ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Uzbekistan<\/span><br \/>"
                }
            },
            "PK": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Pakistan<\/span><br \/>"
                }
            },
            "PS": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Palestine, State Of<\/span><br \/>"
                }
            },
            "PA": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Panama<\/span><br \/>"
                }
            },
            "PG": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Papua New Guinea<\/span><br \/>"
                }
            },
            "PY": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Paraguay<\/span><br \/>"
                }
            },
            "NL": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Netherlands<\/span><br \/>"
                }
            },
            "PE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Peru<\/span><br \/>"
                }
            },
            "PH": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Philippines<\/span><br \/>"
                }
            },
            "PL": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Poland<\/span><br \/>"
                }
            },
            "PT": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Portugal<\/span><br \/>"
                }
            },
            "QA": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Qatar<\/span><br \/>"
                }
            },
            "DO": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Dominican Republic<\/span><br \/>"
                }
            },
            "RO": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Romania<\/span><br \/>"
                }
            },
            "GB": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">United Kingdom<\/span><br \/>"
                }
            },
            "RU": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Russian Federation<\/span><br \/>"
                }
            },
            "RW": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Rwanda<\/span><br \/>"
                }
            },
            "KN": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Saint Kitts And Nevis<\/span><br \/>"
                }
            },
            "SM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">San Marino<\/span><br \/>"
                }
            },
            "VC": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Saint Vincent And The Grenadines<\/span><br \/>"
                }
            },
            "LC": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Saint Lucia<\/span><br \/>"
                }
            },
            "SV": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">El Salvador<\/span><br \/>"
                }
            },
            "WS": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Samoa<\/span><br \/>"
                }
            },
            "ST": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Sao Tome And Principe<\/span><br \/>"
                }
            },
            "SN": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Senegal<\/span><br \/>"
                }
            },
            "RS": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Serbia<\/span><br \/>"
                }
            },
            "SC": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Seychelles<\/span><br \/>"
                }
            },
            "SL": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Sierra Leone<\/span><br \/>"
                }
            },
            "SG": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Singapore<\/span><br \/>"
                }
            },
            "SK": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Slovakia<\/span><br \/>"
                }
            },
            "SI": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Slovenia<\/span><br \/>"
                }
            },
            "SO": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Somalia<\/span><br \/>"
                }
            },
            "SD": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Sudan<\/span><br \/>"
                }
            },
            "SS": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">South Sudan<\/span><br \/>"
                }
            },
            "LK": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Sri Lanka<\/span><br \/>"
                }
            },
            "SE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Sweden<\/span><br \/>"
                }
            },
            "CH": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Switzerland<\/span><br \/>"
                }
            },
            "SR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Suriname<\/span><br \/>"
                }
            },
            "SZ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Swaziland<\/span><br \/>"
                }
            },
            "SY": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Syrian Arab Republic<\/span><br \/>"
                }
            },
            "TJ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Tajikistan<\/span><br \/>"
                }
            },
            "TZ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Tanzania, United Republic Of<\/span><br \/>"
                }
            },
            "TD": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Chad<\/span><br \/>"
                }
            },
            "CZ": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Czech Republic<\/span><br \/>"
                }
            },
            "TH": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Thailand<\/span><br \/>"
                }
            },
            "TL": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Timor-leste<\/span><br \/>"
                }
            },
            "TG": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Togo<\/span><br \/>"
                }
            },
            "TO": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Tonga<\/span><br \/>"
                }
            },
            "TT": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Trinidad And Tobago<\/span><br \/>"
                }
            },
            "TN": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Tunisia<\/span><br \/>"
                }
            },
            "TM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Turkmenistan<\/span><br \/>"
                }
            },
            "TR": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Turkey<\/span><br \/>"
                }
            },
            "TV": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Tuvalu<\/span><br \/>"
                }
            },
            "VU": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Vanuatu<\/span><br \/>"
                }
            },
            "VE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Venezuela, Bolivarian Republic Of<\/span><br \/>"
                }
            },
            "VN": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Viet Nam<\/span><br \/>"
                }
            },
            "UA": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Ukraine<\/span><br \/>"
                }
            },
            "UY": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Uruguay<\/span><br \/>"
                }
            },
            "YE": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Yemen<\/span><br \/>"
                }
            },
            "ZM": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Zambia<\/span><br \/>"
                }
            },
            "ZW": {
                "value": "",
                "href": "#",
                "tooltip": {
                    "content": "<span style=\"font-weight:bold;\">Zimbabwe<\/span><br \/>"
                }
            }
        }
    });
});