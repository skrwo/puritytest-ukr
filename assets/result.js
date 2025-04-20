const titles = {
    "Янгол": [[100, 91], "Вийдіть надвір, доторкніться трави... Вам слід подорослішати", "👼"],
    "Норміс": [[90, 81], "У вас ще все попереду", "😇"],
    "Грішник": [[80, 71], "Не переймайтеся, усі люди такі", "😪"],
    "Іді нахуй": [[70, 0], "Ви горітимете в пеклі", "👿"],
}

window.onload = () => {
    const params = new URLSearchParams(window.location.search)
    const fromTest = params.get("_") != null
    if (fromTest) {
        document.getElementById("take-test").style.display = "none"
        document.getElementById("test-result").style.display = "block"
    }
    console.log("from test:", fromTest)

    window.history.replaceState({}, document.title, window.location.href.split("?")[0])
    
    const checkmarks = [...new Set(params.keys())].filter(key => !isNaN(parseInt(key)))
    const score = 100 - checkmarks.length
    
    document.getElementById("score").innerText = score
    
    const checkmarksDisplay = document.getElementById("checkmarks")
    if (checkmarks.length) checkmarksDisplay.innerHTML += checkmarks.join(" ")
    else checkmarksDisplay.style.display = "none"
    
    for (const [title, [value, description, emoji]] of Object.entries(titles)) {
        if (score <= value[0] && score >= value[1]) {
            document.getElementById("title").innerText = title
            document.getElementById("emoji").innerText = emoji
            document.getElementById("description").innerText = description
            break
        }
    }
}