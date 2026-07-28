export default function HoneypotField() {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label>
        Leave this field blank
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
