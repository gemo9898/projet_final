export const routeRoles: { [key: string]: RouteAccess } = {
	// Authentification
	"/api/auth/login": {
		roles: ["guest"],
		denyMessage: "Vous êtes déjà connecté. Il n'est pas nécessaire de vous reconnecter.",
	},
	"/api/auth/logout": {
		roles: ["user", "moderator", "admin"],
		denyMessage: "Vous n'êtes pas connecté. Vous ne pouvez pas vous déconnecter.",
	},
	"/api/auth/register": {
		roles: ["guest"],
		denyMessage: "Vous avez déjà un compte actif.",
	},

	// Accès à l'accueil
	"/api/home": {
		roles: ["user", "moderator", "admin"],
		denyMessage: "Veuillez vous connecter pour accéder au contenu personnalisé.",
	},

	// Affichage des sujets et messages
	"/api/topics/list": {
		roles: ["guest", "user", "moderator", "admin"],
	},
	"/api/topics/:id": {
		roles: ["guest", "user", "moderator", "admin"],
	},

	// Création de sujets et de réponses
	"/api/topics/create": {
		roles: ["user", "moderator", "admin"],
		denyMessage: "Vous devez être connecté pour créer un sujet.",
	},
	"/api/posts/create": {
		roles: ["user", "moderator", "admin"],
		denyMessage: "Vous devez être connecté pour répondre à un sujet.",
	},

	// Édition ou suppression de messages (modération)
	"/api/posts/edit": {
		roles: ["moderator", "admin"],
		denyMessage: "Seuls les modérateurs ou administrateurs peuvent modifier les messages des autres.",
	},
	"/api/posts/delete": {
		roles: ["moderator", "admin"],
		denyMessage: "Seuls les modérateurs ou administrateurs peuvent supprimer les messages des autres.",
	},

	// Gestion des utilisateurs (admin)
	"/api/users/list": {
		roles: ["admin"],
		denyMessage: "Seuls les administrateurs peuvent consulter la liste des utilisateurs.",
	},
	"/api/users/ban": {
		roles: ["admin"],
		denyMessage: "Seuls les administrateurs peuvent bannir des utilisateurs.",
	},
	"/api/users/promote": {
		roles: ["admin"],
		denyMessage: "Seuls les administrateurs peuvent changer les rôles des utilisateurs.",
	},

	// Téléversement de fichiers
	"/api/files/upload": {
		roles: ["user", "moderator", "admin"],
		denyMessage: "Vous devez être connecté pour téléverser des fichiers.",
	}
};
