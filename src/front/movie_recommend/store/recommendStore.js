import { HYEventStore } from "hy-event-store"
import { getRecommendMovies } from "../service/home"

const recommendStore = new HYEventStore({
	state: {
		recommendMovies: []
	},
	actions: {
		fecthRecommendMoviesAction(ctx) {
			getRecommendMovies().then(res => {
				ctx.recommendMovies = res.data
			})
		}
	}
})

export default recommendStore