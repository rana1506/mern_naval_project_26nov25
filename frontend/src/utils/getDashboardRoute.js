// src/utils/getDashboardRoute.js

const roleRouteMap = {
  admin: "/admindashboard",
  do: "/dodashboard",
  officer: "/officerdashboard",
  sailor: "/sailordashboard",
};

export default function getDashboardRoute(user) {
  if (!user) return "/login";

  // Find the first matching role
  for (const role of user.roles) {
    if (roleRouteMap[role]) {
      return roleRouteMap[role];
    }
  }

  return "/dashboard"; // default for undefined roles
}
