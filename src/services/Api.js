import {PodcastObject} from '../model/PodcastObject'
import PodcastEpisodeObject from "../model/PodcastEpisodeObject";

class Api {
    static async getPodcasts() {
        return fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json', {
            method: 'GET',
        }).then(response => response.json()).then(responseJson => {
            return this.mapToPodcasts(responseJson['feed']['entry'])
        })
    }


    static mapToPodcasts = (rows) => {
        return rows.map(row => {
            return new PodcastObject(
                row['im:image'][2]['label'],
                row['im:name']['label'],
                row['im:artist']['label'],
                row['id']['attributes']['im:id'],
                row['summary']
            )
        })
    }

    static async getPodcastDetail(podcastID) {
        return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(
                `https://itunes.apple.com/lookup?id=${podcastID}&media=podcast&entity=podcastEpisode&limit=20`
            )}`
            ,
            {
                method: 'GET',
            }).then(response => response.json()).then(responseJson => {
            return this.mapToEpisodes(JSON.parse(responseJson['contents'])['results'].slice(1))
        })
    }

    static mapToEpisodes = (rows) => {
        return rows.map(row => {
            return new PodcastEpisodeObject(
                row['trackName'],
                row['releaseDate'],
                row['description'],
                row['episodeUrl'],
                row['trackTimeMillis'],
                row['trackId'],
            )
        })
    }
}

export default Api