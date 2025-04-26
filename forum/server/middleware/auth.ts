import jwt from "jsonwebtoken";
import { routeRoles } from "@/server/utils/roleAccess";

export default defineEventHandler((event) => {
	const url = getRequestURL(event).pathname;
	const token = getCookie(event, "token");

	let currentRole = "guest";

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET!);
			event.context.auth = decoded;
			currentRole = decoded.role;
		} catch {
			throw createError({
				statusCode: 401,
				statusMessage: "Token inválido",
			});
		}
	} else {
		event.context.auth = { role: "guest" };
	}

	const matched = Object.entries(routeRoles).find(([route]) =>
		url.startsWith(route)
	);

	if (matched) {
		const [, { roles, denyMessage }] = matched;

		if (!roles.includes(currentRole)) {
			throw createError({
				statusCode: 403,
				statusMessage: denyMessage ?? "Acceso denegado",
			});
		}
	}
});
