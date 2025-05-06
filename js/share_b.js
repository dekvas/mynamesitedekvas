document.addEventListener("DOMContentLoaded", () => {
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  document.querySelectorAll('.share-btn.telegram, .mini-btn.telegram').forEach(n => n.href = `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`);
  document.querySelectorAll('.share-btn.facebook, .mini-btn.facebook').forEach(n => n.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
  document.querySelectorAll('.share-btn.vk, .mini-btn.vk').forEach(n => n.href = `https://vk.com/share.php?url=${pageUrl}&title=${pageTitle}`);
}
);