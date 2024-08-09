import List "mo:base/List";
import Option "mo:base/Option";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";

actor records {

  /**
   * Types
   */

  // The type of a record identifier.
  public type recordId = Nat32;

  // The type of a record.
  public type record = {
    name : Text;
    content : List.List<Text>;
  };

  /**
   * Application State
   */

  // The next available record identifier.
  private stable var next : recordId = 0;

  // The record data store.
  private stable var records : Trie.Trie<recordId, record> = Trie.empty();

  /**
   * High-Level API
   */

  // Create a record.
  public func create(record : record) : async recordId {
    let recordId = next;
    next += 1;
    records := Trie.replace(
      records,
      key(recordId),
      Nat32.equal,
      ?record,
    ).0;
    return recordId;
  };

  // Read a record.
  public query func read(recordId : recordId) : async ?record {
    let result = Trie.find(records, key(recordId), Nat32.equal);
    return result;
  };

  // Update a record.
  public func update(recordId : recordId, record : record) : async Bool {
    let result = Trie.find(records, key(recordId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      records := Trie.replace(
        records,
        key(recordId),
        Nat32.equal,
        ?record,
      ).0;
    };
    return exists;
  };

  // Delete a record.
  public func delete(recordId : recordId) : async Bool {
    let result = Trie.find(records, key(recordId), Nat32.equal);
    let exists = Option.isSome(result);
    if (exists) {
      records := Trie.replace(
        records,
        key(recordId),
        Nat32.equal,
        null,
      ).0;
    };
    return exists;
  };

  

  /**
   * Utilities
   */

  // Create a trie key from a record identifier.
  private func key(x : recordId) : Trie.Key<recordId> {
    return { hash = x; key = x };
  };
};
