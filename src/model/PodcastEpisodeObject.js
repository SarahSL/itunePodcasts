export default class PodcastEpisodeObject {

    constructor(trackName, releaseDate, description, episodeUrl, trackTimeMillis, id) {
        this.trackName = trackName;
        this.releaseDate = releaseDate;
        this.description = description;
        this.episodeUrl = episodeUrl;
        this.trackTimeMillis = trackTimeMillis;
        this.id = id;
    }
}
