import { router } from "tinro"

export const navigate = (link: string) => {
	router.goto(link)
}
