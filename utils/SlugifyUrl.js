exports.SlugUrl = (text) => {
	return text.toLowerCase().trim().split(" ").join("-")
}