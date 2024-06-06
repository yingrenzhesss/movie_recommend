import { HYEventStore } from "hy-event-store"
import { getLaterMovies } from "../service/home"

const laterStore = new HYEventStore({
	state: {
		laterMovies: []
	},
	actions: {
		fecthLaterMoviesAction(ctx) {
			getLaterMovies().then(res => {
				ctx.laterMovies = res.data
			})
		}
	}
})

export default laterStore