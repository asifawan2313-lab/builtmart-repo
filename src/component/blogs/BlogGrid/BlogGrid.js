// Grid: articles ko columns mein dikhata hai (desktop par 4). Card page se aata hai
const BlogGrid = ({ items, Card }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {items.map((item) => (
      <Card key={item.id} {...item} />
    ))}
  </div>
);

export default BlogGrid;