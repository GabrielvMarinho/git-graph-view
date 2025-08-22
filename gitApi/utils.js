
export function isValidBranchName(name) {
 

  const invalidPatterns = [
    /^\./,                    
    /\.$/,                    
    /\.lock$/,                
    /@{/,                     
    /\.\./,                   
    /\/$/,                    
    /\/\/+/,                  
    /[\000-\037\177]/,        
    /[ ~^:?*\[\\]/            
  ];
  
  for (let pattern of invalidPatterns) {
    if (pattern.test(name)) {
      return false
    }
  }

  if (name.startsWith('-') || name.endsWith('-')) {
    return false;
  }

  return true
}