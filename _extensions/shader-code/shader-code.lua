-- Minimal shader-code extension

return {
  ['shader-code'] = function(args, kwargs, meta)
    local name = pandoc.utils.stringify(args[1])
    return pandoc.CodeBlock("-- Placeholder for: " .. name, {class = "glsl"})
  end
}
