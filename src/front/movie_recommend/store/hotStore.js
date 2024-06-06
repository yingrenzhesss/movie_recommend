import { HYEventStore } from "hy-event-store"
import { getHotMovies } from "../service/home"

const hotStore = new HYEventStore({
	state: {
		hotMovies: []
	},
	actions: {
		fecthHotMoviesAction(ctx) {
			getHotMovies().then(res => {
				ctx.hotMovies = res.data
			})
		}
	}
})

export default hotStore