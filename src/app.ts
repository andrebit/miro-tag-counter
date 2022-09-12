async function addSticky() {

  const tags = await miro.board.get({type: ["tag"]});
  const cards = await miro.board.get({type: ["card"]});
  const summary = new Map<string, number>();
  let report: string = '';

  cards.forEach((card) => {
    if(card.type === "card")
    {
      card.tagIds.forEach((tag) => {
        if(summary.has(tag))
        {
          const counter = summary.get(tag) as number;
          summary.set(tag, counter+1);
        }
        else
        {
          summary.set(tag, 1);
        }
      });
    }
  });
  
  summary.forEach((value, key) => {
    const tagName = tags.find((item => item.id === key));
    if(tagName?.type === "tag") {
      const counter = value;
      report = report.concat(`${tagName.title}: ${counter} </br>`);
    }
  });

  miro.board.createText({
    content: report
  });
}

addSticky();
