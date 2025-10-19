document.querySelectorAll(".labels").forEach(labelBox => {
      const spans = labelBox.querySelectorAll("span");
      let index = 0;

      function cycleLabels() {
        spans.forEach(span => span.classList.remove("show", "hide"));

        spans[index].classList.add("show");

        setTimeout(() => {
          spans[index].classList.add("hide");
          index = (index + 1) % spans.length;
          setTimeout(cycleLabels, 800); // بعد ما تختفي، يعرض اللي بعدها
        }, 1200); // مدة عرض كل وسم
      }

      if (spans.length > 0) cycleLabels();
    });