import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    // İstek başlıklarına Authorization ekle
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Eğer token varsa, istek başlıklarına Authorization ekle
    // ve isteği devam ettir
    return next(clonedRequest);
  }
  // Eğer token yoksa, isteği olduğu gibi devam ettir
  // (bu durumda Authorization başlığı olmayacak)
  return next(req);
};
