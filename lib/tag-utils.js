export function splitTagItems(tagValues) {
  const newItems = tagValues.filter((tag) => {
    return tag?.__isNew__;
  });

  const selectedItems = (tags) => {
    const items = tags.filter((tag) => {
      return !tag?.__isNew__;
    });

    return items.map((tag) => {
      return tag.value;
    });
  };

  return {
    new: newItems,
    selected: selectedItems(tagValues),
  };
}

export function setTagIds(tagValues) {
  return tagValues.map((tag) => {
    return {
      label: tag.name,
      value: tag._id.toString(),
    };
  });
}

export function buildTagOptions(tags) {
  return tags.map((tag) => {
    return {
      label: tag.name,
      value: tag._id.toString(),
    };
  });
}
