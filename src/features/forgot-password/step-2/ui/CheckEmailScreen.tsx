export function CheckEmailScreen({ email }: { email: string }) {
  return (
    <div className="text-center p-12 space-y-4">
      <h2 className="text-2xl font-bold text-green-600">Ссылка отправлена</h2>
      <p className="text-lg">
        На адрес <strong>{email}</strong>
      </p>
      <p className="text-gray-600">
        проверьте почту для перехода к восстановлению
      </p>
    </div>
  );
}
