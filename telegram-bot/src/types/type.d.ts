export type APIResponse = {
  result: {
    output: {
      raw: string
      pydantic: any
      json_dict: any
      tasks_output: any[]
      token_usage: Record<string, any>[]
    }
  }
  links: string[]
}
