const titles = {
    "Янгол": [[Infinity, 11], "Ви хто", "👼"],
    "Норміс": [[10, 7], "Можливо Давид або Вероніка", "😇"],
    "Грішник": [[6, 4], "Мали б отримати Дар'я або Михайло", "😪"],
    "Іді нахуй": [[3, 0], "Мала б отримати Анастасія", "👿"],
}

window.onload = () => {
    const params = new URLSearchParams(window.location.search)
    const savedResultParse = parseInt(window.location.hash.slice(1), 32)
    const savedResult = isNaN(savedResultParse) ? undefined : savedResultParse
    const isLegit = params.get("_") != null || !isNaN(savedResultParse)
    if (isLegit) {
        document.getElementById("take-test").style.display = "none"
        document.getElementById("test-result").style.display = "block"
    }

    window.history.replaceState({}, document.title, window.location.href.split("?")[0])
    
    const checkmarks = savedResult ? [] : [...new Set(params.keys())].filter(key => !isNaN(parseInt(key)))
    const score = savedResult ?? 12 - checkmarks.length
    window.location.hash = score.toString(32)
    
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