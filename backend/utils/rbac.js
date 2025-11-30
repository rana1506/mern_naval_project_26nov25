/*
 Field-level RBAC helper.
 Example usage in controllers: checkFieldAccess(req.user, 'sailor', 'medicalFit', 'update')
*/
const checkFieldAccess = (user, resource, field, action) => {
  // Admins can do anything
  if (user.roles.includes('admin')) return true;

  // Divisional Officer (do) sample policy:
  if (resource === 'sailor') {
    if (user.roles.includes('do')) {
      // DO can update most sailor fields but not medicalFit (example)
      if (action === 'update' && field === 'medicalFit') return false;
      return true;
    }
  }

  // Default: deny editing of sensitive fields
  if (['email', 'serviceNo'].includes(field)) return false;
  return true;
};

module.exports = { checkFieldAccess };
